import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db, auth } from "db/firebase";

// TODO handle case where user signed up with Google tries to sign in with email and vice versa

export const loginWithCredentials = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      let admin = false;
      const adminDoc = await getDoc(doc(db, "app", "admin"));

      if (adminDoc.exists()) {
        if (adminDoc.data().whitelist.includes(email)) {
          admin = true;
        }
      }

      return { success: true, admin: admin };
    })
    .catch((error) => {
      let errorMsg = "";
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      ) {
        errorMsg =
          "Email or password is incorrect, please double check the email and password for your account.";
      } else {
        errorMsg = "Something went wrong, please try again.";
      }

      return { success: false, error: errorMsg };
    });
};

export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, new GoogleAuthProvider())
    .then((res) => {
      const isNewUser =
        res.user.metadata.creationTime === res.user.metadata.lastSignInTime;
      return { success: true, isNewUser: isNewUser };
    })
    .catch((error) => {
      const errorMsg = "Something went wrong, please try again.";
      return { success: false, error: errorMsg };
    });
};
