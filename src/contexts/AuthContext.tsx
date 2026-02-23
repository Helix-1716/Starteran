import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'employee' | 'recruiter' | 'student';
  avatar_url?: string;
  online?: boolean;
  lastSeen?: number;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  education?: string;
  experience?: string;
  company?: string;
  college?: string;
  graduation_year?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  resume_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, role: 'employee' | 'recruiter' | 'student') => Promise<void>;
  logout: () => Promise<void>;
  signInWithGoogle: (role?: 'employee' | 'recruiter' | 'student') => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper: wrap a promise with a timeout so it never hangs forever
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms))
  ]);
}

// Map Firebase error codes to user-friendly messages
function getAuthErrorMessage(error: any): string {
  const code = error?.code || '';
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Please check and try again.';
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was cancelled.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    default:
      return error?.message || 'An unexpected error occurred. Please try again.';
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const buildBasicProfile = (firebaseUser: any, role: 'employee' | 'recruiter' | 'student' = 'employee'): UserProfile => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    full_name: firebaseUser.displayName || 'User',
    role,
    avatar_url: firebaseUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
    online: true,
    lastSeen: Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocResult = await withTimeout(
            getDoc(doc(db, 'users', firebaseUser.uid)),
            5000,
            null
          );

          if (userDocResult && userDocResult.exists()) {
            const data = userDocResult.data() as UserProfile;
            const updatedProfile = { ...data, online: true, lastSeen: Date.now() };
            setUser(updatedProfile);
            // Non-blocking update to firestore
            updateDoc(doc(db, 'users', firebaseUser.uid), { online: true, lastSeen: Date.now() }).catch(() => { });
          } else {
            const basicProfile = buildBasicProfile(firebaseUser);
            setUser(basicProfile);
            setDoc(doc(db, 'users', firebaseUser.uid), basicProfile).catch((err) => {
              console.warn('Could not save profile to Firestore:', err.message);
            });
          }
        } catch (error) {
          console.warn('Firestore read failed, using basic profile:', error);
          setUser(buildBasicProfile(firebaseUser));
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // WhatsApp-Style Realtime Presence (Online/Offline)
  useEffect(() => {
    if (!user) return;

    const setPresence = (isOnline: boolean) => {
      updateDoc(doc(db, 'users', user.id), {
        online: isOnline,
        lastSeen: Date.now()
      }).catch(() => { });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setPresence(true);
      } else {
        setPresence(false);
      }
    };

    const handleBeforeUnload = () => {
      setPresence(false);
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user?.id]);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(getAuthErrorMessage(error));
    }
  };

  const signup = async (email: string, password: string, fullName: string, role: 'employee' | 'recruiter' | 'student') => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);

      const userProfile: UserProfile = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        full_name: fullName,
        role,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setUser(userProfile);

      setDoc(doc(db, 'users', firebaseUser.uid), userProfile).catch((err) => {
        console.warn('Could not save profile to Firestore:', err.message);
      });
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(getAuthErrorMessage(error));
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await updateDoc(doc(db, 'users', user.id), {
          online: false,
          lastSeen: Date.now()
        });
      }
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(getAuthErrorMessage(error));
    }
  };

  const signInWithGoogle = async (role: 'employee' | 'recruiter' | 'student' = 'employee') => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const userDocResult = await withTimeout(
        getDoc(doc(db, 'users', result.user.uid)),
        5000,
        null
      );

      if (!userDocResult || !userDocResult.exists()) {
        const userProfile: UserProfile = {
          id: result.user.uid,
          email: result.user.email!,
          full_name: result.user.displayName || 'User',
          role,
          avatar_url: result.user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${result.user.email}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        setUser(userProfile);

        setDoc(doc(db, 'users', result.user.uid), userProfile).catch((err) => {
          console.warn('Could not save Google profile to Firestore:', err.message);
        });
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error(getAuthErrorMessage(error));
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) throw new Error('Not logged in');

    const updatedData = {
      ...data,
      updated_at: new Date().toISOString()
    };

    // Update local state immediately
    setUser(prev => prev ? { ...prev, ...updatedData } : prev);

    // Save to Firestore in background
    try {
      await withTimeout(
        updateDoc(doc(db, 'users', user.id), updatedData),
        5000,
        undefined
      );
    } catch (err: any) {
      console.warn('Could not update profile in Firestore:', err.message);
      // Still keep the local update — profile is saved locally
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    signInWithGoogle,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}