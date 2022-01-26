// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
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
