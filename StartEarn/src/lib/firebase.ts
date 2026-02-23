import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCIbRsSgNapGztWKiWla3u93-lphRgQcUY",
  authDomain: "apaagency-f92f6.firebaseapp.com",
  projectId: "apaagency-f92f6",
  storageBucket: "apaagency-f92f6.firebasestorage.app",
  messagingSenderId: "1081505391618",
  appId: "1:1081505391618:web:3fca9cf9e9d9ee51f3f31b",
  measurementId: "G-J9TWQNXSBD"
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

// Initialize Analytics (optional - only if you want analytics)
export const analytics = getAnalytics(app);

export default app; 