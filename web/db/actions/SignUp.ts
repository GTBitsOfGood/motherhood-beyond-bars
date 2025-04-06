import Cookies from "js-cookie";

import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "db/firebase";

import { Caregiver } from "@lib/types/users";
import { cleanPhoneNumber } from "@lib/utils/contactInfo";

export const isUniqueEmail = async (email: string) => {
  const docs = await getDocs(
    query(
      collection(db, "caregivers"),
      where("email", "==", email.toLowerCase())
    )
  );

  if (docs.empty) {
    return { isUnique: true };
  } else {
    const foundCaregiver = docs.docs[0].data() as Caregiver;
    return {
      isUnique: false,
      caregiverName: foundCaregiver.firstName + " " + foundCaregiver.lastName,
      caregiverDoc: docs.docs[0],
      isAuthNull: foundCaregiver.auth === null,
    };
  }
};

export async function checkAdminCreatedAccount(
  firstName: string,
  lastName: string,
  phoneNumber: string,
  matchedCaregiver: QueryDocumentSnapshot<DocumentData> | undefined
): Promise<
  | {
      success: true;
      matchedCaregiver: QueryDocumentSnapshot<DocumentData>;
    }
  | { success: false; error: string }
> {
  try {
    if (!matchedCaregiver) {
      throw Error;
    }

    const data = matchedCaregiver.data();

    phoneNumber = cleanPhoneNumber(phoneNumber);

    if (
      data.firstName === firstName &&
      data.lastName === lastName &&
      data.phoneNumber === phoneNumber
    ) {
      return { success: true, matchedCaregiver };
    } else {
      return {
        success: false,
        error: "Details do not match. Please contact MBB for support.",
      };
    }
  } catch (e) {
    return { success: false, error: "Something went wrong, please try again." };
  }
}

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
  phoneNumber: string,
  matchedCaregiver?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{ success: true } | { success: false; error: string }> {
  const authData = userCredential ? userCredential.user : undefined;
  const defaultError = {
    success: false,
    error: "Something went wrong, please try again.",
  };

  if (!authData) {
    return defaultError;
  }

  try {
    if (matchedCaregiver && matchedCaregiver.ref) {
      // Pair the caregiver account
      await updateDoc(matchedCaregiver.ref, {
        auth: authData.uid,
        onboarding: false,
      });
      return { success: true };
    } else {
      // Create a new caregiver document
      const caregiverDoc = doc(db, "caregivers", authData.uid);
      await setDoc(caregiverDoc, {
        firstName,
        lastName,
        phoneNumber: cleanPhoneNumber(phoneNumber),
        email: authData.email?.toLowerCase(),
        auth: authData.uid,
        babyCount: 0,
        onboarding: false,
        createdAt: new Date(),
      });

      return { success: true };
    }
  } catch (error) {
    return defaultError;
  }
}
