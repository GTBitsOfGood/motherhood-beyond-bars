import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  addDoc,
  updateDoc,
  getDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "db/firebase";

import {
  PaginationInfoType,
  PaginationReferencesType,
} from "@lib/types/common";
import { getQueryConstraintsFromPagination } from "@lib/utils/pagination";
import { CAREGIVERS_COLLECTION_PATH, COLLECTION_ORDER_KEYS } from "db/consts";
import getCaregiversFromCaregiverDocs from "@lib/utils/caregiver";
import { Caregiver } from "@lib/types/users";
import {
  FailedToAddError,
  FailedToDeleteError,
  FailedToEditError,
  FailedToFetchError,
} from "@lib/exceptions/DatabaseExceptions";
import { removeCaretakerFromBabies } from "../shared/babyCaregiver";
import { getAuth } from "firebase-admin/auth";

const docType = "caregiver";
const path = CAREGIVERS_COLLECTION_PATH;

export async function getCaregiver(caretakerID: string) {
  if (!caretakerID) return null;
  const caregiverRef = doc(collection(db, path), caretakerID); // "caregivers" is the collection
  const caregiverDoc = await getDoc(caregiverRef);
  return caregiverDoc;
}

export async function getCaregivers() {
  try {
    const constraint = orderBy(COLLECTION_ORDER_KEYS[path]);
    const itemsRef = query(collection(db, path), constraint);
    const caregiverDocs = await getDocs(itemsRef);
    const caregivers = await getCaregiversFromCaregiverDocs(caregiverDocs);
    return caregivers;
  } catch (error) {
    throw new FailedToFetchError(docType);
  }
}

export const addNewCaregiver = async (caregiver: Caregiver) => {
  try {
    const newCaregiver = await addDoc(collection(db, path), {
      ...caregiver,
      babies: [],
      babyCount: 0,
      createdAt: serverTimestamp(),
    });

    return newCaregiver;
  } catch (error) {
    throw new FailedToAddError(docType);
  }
};

export async function getCaregiverPage(
  pageNumber: number,
  paginationReferences: PaginationReferencesType
) {
  const constraints = getQueryConstraintsFromPagination(
    path,
    pageNumber,
    paginationReferences
  );
  try {
    const itemsRef = query(collection(db, path), ...constraints);
    const caregiverDocs = await getDocs(itemsRef);
    const caregivers = await getCaregiversFromCaregiverDocs(caregiverDocs);
    const paginationInfo: PaginationInfoType = {
      pageNumber: pageNumber,
      startAfter: caregiverDocs?.docs[caregivers.length - 1],
    };
    return { data: caregivers, paginationInfo: paginationInfo };
  } catch (error) {
    throw new FailedToFetchError(docType);
  }
}

export async function updateCaregiver(uid: string, caregiver: any) {
  const caregiverDoc = doc(db, path, uid);
  try {
    await updateDoc(caregiverDoc, caregiver as Partial<Caregiver>);
  } catch (error) {
    throw new FailedToEditError(docType);
  }
}

export const deleteCaretaker = async (caretaker: Caregiver) => {
  const caretakerID = caretaker.id;

  try {
    await removeCaretakerFromBabies(caretaker.babies);
    await deleteDoc(doc(db, path, caretakerID));
  } catch (error) {
    throw new FailedToDeleteError(docType);
  }
};

export const caregiverFromAuthToken = async (token: string | undefined) => {
  if (!token) return undefined;

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    const caregiverId = decodedToken.uid;
    const caregiver = (await getCaregiver(caregiverId).then((c) =>
      c?.data()
    )) as Caregiver;

    return caregiver;
  } catch (e) {
    console.error("Failed to get caregiver from token", e);
    return undefined;
  }
};
