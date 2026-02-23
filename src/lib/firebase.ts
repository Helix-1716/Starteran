import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCexd18npoBJ22CiilTL053j-an-LEhYmI",
  authDomain: "start-earn-7f1f0.firebaseapp.com",
  projectId: "start-earn-7f1f0",
  storageBucket: "start-earn-7f1f0.firebasestorage.app",
  messagingSenderId: "135302638213",
  appId: "1:135302638213:web:ccb6b6ca6c8739e46557ec",
  measurementId: "G-DMJRGDLN4K"
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