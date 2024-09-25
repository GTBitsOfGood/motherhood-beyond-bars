import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "db/firebase";

export const loginWithCredentials = async (email: string, password: string) => {
  // TODO return if user is Admin or Caregiver
  return await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false };
    });
};

export const loginWithGoogle = async () => {
  // TODO return if user is new or not
  return await signInWithPopup(auth, new GoogleAuthProvider())
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false };
    });
};
