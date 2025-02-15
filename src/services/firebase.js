import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET, 
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID, 
  appId: process.env.REACT_APP_FIREBASE_APPID, 
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID, 

  };
  

  // ✅ Initialize Firebase before using `app`
const app = initializeApp(firebaseConfig); 

// ✅ Firebase Authentication
export const auth = getAuth(app);

// ✅ Firestore Database
export const db = getFirestore(app);

// ✅ Google Authentication Provider (Fix missing export)
export const googleProvider = new GoogleAuthProvider(); 

export default app;  // ✅ Export `app`
