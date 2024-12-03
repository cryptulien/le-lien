import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyANC6iV8NJpVlmXzDen2RpmWBx0yLeTI78",
  authDomain: "le-lien-f8ede.firebaseapp.com",
  projectId: "le-lien-f8ede",
  storageBucket: "le-lien-f8ede.firebasestorage.app",
  messagingSenderId: "707242233361",
  appId: "1:707242233361:web:f8ca5df8f040e71d51ebb0",
  measurementId: "G-KR9D926PBB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
