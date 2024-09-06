import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { SubmitHandler } from "react-hook-form";
import { auth } from "db/firebase";
import { AuthFormValues } from "@lib/types/common";

//possible statuses
type loginStatus = 'Success' | 'Error';

export const loginWithCredentials: SubmitHandler<AuthFormValues> = async (data) => {
  try {
    // TODO redirect user to correct home page with /admin or /caregiver
    // probably by checking if the login was successful then using router to route
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    console.log("You've successfully logged in!")
    return {
      status: "Success" as loginStatus
    }
  } catch (error) {
    console.error("Error logging in", error);
    alert("Invalid credentials!");
    return {
      status: "Error" as loginStatus
    }
  }
};

export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
    console.log("You've successfully logged in!")
    return {
      status: "Success" as loginStatus
    }
  } catch (error) {
    console.error("Error logging in", error);
    return {
      status: "Error" as loginStatus
    }
  }
};
