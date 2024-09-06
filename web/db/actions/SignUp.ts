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

type signUpStatus = 'Success' | 'Error';

export const isUniqueEmail = async (email: string) => {
  (
    await getDocs(
      query(collection(db, "caregivers"), where("email", "==", email))
    )
  ).empty;
};

export async function createAdminAccount(account: Account) {
  // TODO Check if admin is whitelisted first
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      account.email.trim(),
      account.password
    )
    // TODO set firstName, lastName, and phoneNumber for Admins
    // TODO return success or error message
    const authData = userCredential.user;
    if (!authData?.uid) {
      throw new Error("Couldn't get userID")
    }
    const adminDoc = doc(db, "admins", authData?.uid as string);
    setDoc(adminDoc, {
      firstName: account.firstName,
      lastName: account.lastName,
      phoneNumber: account.phoneNumber,
    });
    console.log("You've successfully signed up!")
    return {
      status: "Success" as signUpStatus
    }
  } catch (error) {
    console.error("Error logging in", error);
    return {
      status: "Error" as signUpStatus
    }
  }
}

// TODO return success or error message
export async function createCaregiverAccount(account: Account) {
  try {
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
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    setDoc(caregiverDoc, {
      firstName: account.firstName,
      lastName: account.lastName,
      phoneNumber: account.phoneNumber,
    });
    console.log("You've successfully signed up!")
    return {
      status: "Success" as signUpStatus
    }
  } catch (error) {
    console.error("Error logging in", error);
    return {
      status: "Error" as signUpStatus
    }
  }
}
