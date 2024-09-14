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
import { Account } from "@lib/types/users";
import { user } from "firebase-functions/v1/auth";

export const isUniqueEmail = async (email: string) => {
  (
    await getDocs(
      query(collection(db, "caregivers"), where("email", "==", email))
    )
  ).empty;
};

export async function createAdminAccount(account: Account) {
  // TODO Check if admin is whitelisted first
  await createUserWithEmailAndPassword(
    auth,
    account.email.trim(),
    account.password
  ).then(() => {
    // TODO set firstName, lastName, and phoneNumber for Admins
  });

  // TODO return success or error message
}

// TODO return success or error message
export async function createAccount(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email.trim(), password).then((userCredential) => {
    return {"success": true, userCredential}
  }).catch((error) => {
    return {"success": false}
  })
}

export async function createCaregiverAccount(userCredential: UserCredential, firstName: string, lastName: string, phoneNumber: string) {
  const authData = userCredential.user;
  const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
  setDoc(caregiverDoc, {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
  });
}
