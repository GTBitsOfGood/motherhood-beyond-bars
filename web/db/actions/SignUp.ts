import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "db/firebase";
import { Account } from "@lib/types/users";

export const isUniqueEmail = async (email: string) => {
  (
    await getDocs(
      query(collection(db, "caregivers"), where("email", "==", email))
    )
  ).empty;
};

// TODO return success or error message
export async function createCaregiverAccount(account: Account) {
  try {
    const caregiverDoc = doc(db, "caregivers", auth.currentUser?.uid as string);
    debugger
    setDoc(caregiverDoc, {
      firstName: account.firstName,
      lastName: account.lastName,
      phoneNumber: account.phoneNumber,
    });
    return {
      success: true
    }
  } catch (error) {
    return {
      success: false
    }
  }
}

export async function createAccount(account: Account) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    account.email.trim(),
    account.password
  )
  debugger;
  const authData = userCredential.user;
  if (!authData?.uid) {
    throw new Error("Couldn't get userID")
  }
}
