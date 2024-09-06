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
export async function createCaregiverAccount(account: Account) {
  await createUserWithEmailAndPassword(
    auth,
    account.email.trim(),
    account.password
  ).then((userCredential) => {
    debugger;
    const authData = userCredential.user;
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    setDoc(caregiverDoc, {
      firstName: account.firstName,
      lastName: account.lastName,
      phoneNumber: account.phoneNumber,
    });
  });
}
