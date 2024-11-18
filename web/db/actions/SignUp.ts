import Cookies from "js-cookie";

import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "db/firebase";

import { Caregiver } from "@lib/types/users";

export const isUniqueEmail = async (
  email: string,
  returnName: boolean = false
) => {
  const docs = await getDocs(
    query(
      collection(db, "caregivers"),
      where("email", "==", email.toLowerCase())
    )
  );

  if (!returnName) {
    return docs.empty;
  } else {
    if (docs.empty) {
      return { isUnique: true };
    } else {
      const foundCaregiver = docs.docs[0].data() as Caregiver;
      return {
        isUnique: false,
        caregiverName: foundCaregiver.firstName + " " + foundCaregiver.lastName,
      };
    }
  }
};

export async function createAccount(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email.trim(), password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const token = await user.getIdToken();
      Cookies.set("authToken", token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      return { success: true, userCredential: userCredential };
    })
    .catch((error) => {
      // auth/email-already-in-use
      return { success: false };
    });
}

export async function createCaregiverAccount(
  userCredential: UserCredential | undefined,
  firstName: string,
  lastName: string,
  phoneNumber: string
) {
  const authData = userCredential ? userCredential.user : undefined;

  try {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    setDoc(caregiverDoc, {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: authData?.email?.toLowerCase(),
      auth: authData?.uid,
      babyCount: 0,
      onboarding: false,
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
