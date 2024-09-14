import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { SubmitHandler } from "react-hook-form";

import { auth } from "db/firebase";
import { AuthFormValues } from "@lib/types/common";
import { debug } from "console";

export const loginWithCredentials = async (email: string, password: string) => {
  
  // TODO redirect user to correct home page with /admin or /caregiver
  // probably by checking if the login was successful then using router to route
  return await signInWithEmailAndPassword(auth, email, password).then(() => {
    return {"success": true}
  }).catch((error) => {
    return {"success": false}
  })
};

export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
    return {"success": true}
  }).catch((error) => {
    return {"success": false}
  })
};
