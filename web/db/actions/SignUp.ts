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

export async function checkAdminCreatedAccount(
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
): Promise<
  | {
      success: true;
      matchedCaregiver: QueryDocumentSnapshot<DocumentData> | null;
    }
  | { success: false; error: string }
> {
  try {
    const caregiverQuery = query(
      collection(db, "caregivers"),
      where("email", "==", email)
    );
    const caregiverSnapshot = await getDocs(caregiverQuery);

    if (!caregiverSnapshot.empty) {
      let matchedCaregiver = null;

      for (const doc of caregiverSnapshot.docs) {
        const data = doc.data();
        if (
          data.firstName === firstName &&
          data.lastName === lastName &&
          data.phoneNumber === phoneNumber
        ) {
          matchedCaregiver = doc;
          break;
        }
      }
      if (matchedCaregiver && matchedCaregiver.ref) {
        return { success: true, matchedCaregiver: matchedCaregiver };
      }
      return {
        success: false,
        error: "Details do not match. Please contact MBB for support.",
      };
    } else {
      return { success: true, matchedCaregiver: null };
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
        phoneNumber,
        email: authData.email?.toLowerCase(),
        auth: authData.uid,
        babyCount: 0,
        onboarding: false,
      });

      return { success: true };
    }
  } catch (error) {
    return defaultError;
  }
}
