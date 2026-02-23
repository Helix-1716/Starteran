import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('🔥 Firebase initialized with config:', firebaseConfig.projectId);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Set persistence to keep users logged in
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('✅ Firebase persistence set to local');
  })
  .catch((error) => {
    console.error('❌ Error setting persistence:', error);
  });

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
console.log('📚 Firestore initialized');

// Initialize Cloud Storage
export const storage = getStorage(app);
console.log('📦 Storage initialized');

// Initialize Analytics (optional - only if you want analytics)
export const analytics = getAnalytics(app);

export default app; 