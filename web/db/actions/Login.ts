import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Cookies from "js-cookie"; // For setting cookies
import { db, auth } from "db/firebase";

// Login with Email and Password
export const loginWithCredentials = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch the token and set it in the cookies
      const token = await user.getIdToken();
      Cookies.set("authToken", token, {
        path: "/",
        secure: true, // Enable this in production
        sameSite: "Strict",
        httpOnly: true,
      });

      return { success: true }; // No need to return admin status here
    })
    .catch((error) => {
      let errorMsg = "";
      console.error("Error during login:", error); // Debug log for errors
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

// Login with Google
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, new GoogleAuthProvider())
    .then(async (res) => {
      const user = res.user;

      // Fetch the token and set it in the cookies
      const token = await user.getIdToken();
      Cookies.set("authToken", token, {
        path: "/",
        secure: true, // Enable in production
        sameSite: "Strict",
      });

      // Check if the user is new
      const isNewUser =
        res.user.metadata.creationTime === res.user.metadata.lastSignInTime;
      return { success: true, isNewUser };
    })
    .catch((error) => {
      console.error("Error during Google login:", error); // Debug log for errors
      const errorMsg = "Something went wrong, please try again.";
      return { success: false, error: errorMsg };
    });
};
