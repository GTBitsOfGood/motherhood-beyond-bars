import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { SubmitHandler } from "react-hook-form";
import { auth } from "db/firebase";
import { AuthFormValues } from "@lib/types/common";
import { useAuthState } from "react-firebase-hooks/auth";


export const loginWithCredentials: SubmitHandler<AuthFormValues> = async (data) => {
  try {
    // TODO redirect user to correct home page with /admin or /caregiver
    // probably by checking if the login was successful then using router to route
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    console.log("You've successfully logged in!")
    return {
      success: true
    }
  } catch (error) {
    console.error("Error logging in", error);
    alert("Invalid credentials!");
    return {
      success: false
    }
  }
};

export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    debugger
    const isNewUser = userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime;
    if (isNewUser) {
      return {
        success: true,
        isNewUser: true
      }
    } else {
      return {
        success: true,
        isNewUser: false
      }
    }
  } catch (error) {
    return {
      success: false
    }
  }
};
