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

export const isUniqueEmail = async (email: string) => {
  (
    await getDocs(
      query(collection(db, "caregivers"), where("email", "==", email))
    )
  ).empty;
};

// TODO return success or error message
export async function createAccount(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email.trim(), password)
    .then((userCredential) => {
      return { success: true, userCredential };
    })
    .catch((error) => {
      return { success: false };
    });
}

export async function createCaregiverAccount(
  userCredential: UserCredential,
  firstName: string,
  lastName: string,
  phoneNumber: string
) {
  const authData = userCredential.user;
  try {
    const caregiverDoc = doc(db, "caregivers", authData?.uid as string);
    setDoc(caregiverDoc, {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
