// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFlonrsNs7z9h4OIBNrAs3sztHaW8lzQQ",
  authDomain: "motherhood-beyond-bars.firebaseapp.com",
  projectId: "motherhood-beyond-bars",
  storageBucket: "motherhood-beyond-bars.appspot.com",
  messagingSenderId: "1020815313234",
  appId: "1:1020815313234:web:ed7e875d17c144ccb5528b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

// connectAuthEmulator(auth, "http://localhost:9099");
