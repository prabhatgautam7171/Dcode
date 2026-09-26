
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "budwise-c0ab6.firebaseapp.com",
  projectId: "budwise-c0ab6",
  storageBucket: "budwise-c0ab6.firebasestorage.app",
  messagingSenderId: "121171660423",
  appId: "1:121171660423:web:d734c3e731abe22e833222",
  measurementId: "G-YNQZFDPC6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});
const analytics = getAnalytics(app);
