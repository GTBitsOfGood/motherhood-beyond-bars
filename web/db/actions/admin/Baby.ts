import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
  query,
  writeBatch,
  getDoc,
  orderBy,
} from "firebase/firestore";

import { Baby } from "@lib/types/baby";

import { db } from "db/firebase";
import {
  PaginationInfoType,
  PaginationReferencesType,
} from "@lib/types/common";
import {
  BABIES_COLLECTION_PATH,
  CAREGIVERS_COLLECTION_PATH,
  COLLECTION_ORDER_KEYS,
} from "db/consts";
import { getQueryConstraintsFromPagination } from "@lib/utils/pagination";
import getBabiesFromBabyDocs from "@lib/utils/baby";
import {
  FailedToAddError,
  FailedToDeleteError,
  FailedToEditError,
  FailedToFetchError,
} from "@lib/exceptions/DatabaseExceptions";
import {
  addBabyToCaretaker,
  removeBabyFromCaretaker,
} from "../shared/babyCaregiver";

const path = BABIES_COLLECTION_PATH;
const caregiverPath = CAREGIVERS_COLLECTION_PATH;
const docType = "baby";

export async function getBabyPage(
  pageNumber: number,
  paginationReferences: PaginationReferencesType,
  filters: any
) {
  const constraints = getQueryConstraintsFromPagination(
    path,
    pageNumber,
    paginationReferences
  );

  const itemsRef = query(collection(db, path), ...constraints);

  try {
    const babyDocs = await getDocs(itemsRef);
    const babies = await getBabiesFromBabyDocs(babyDocs);
    const paginationInfo: PaginationInfoType = {
      pageNumber: pageNumber,
      startAfter: babyDocs?.docs[babies.length - 1],
    };
    return { data: babies, paginationInfo: paginationInfo };
  } catch (error) {
    throw new FailedToFetchError(docType);
  }
}

export async function getBabies(filters?: any) {
  const constraint = orderBy(COLLECTION_ORDER_KEYS[path]);

  const itemsRef = query(collection(db, path), constraint);

  try {
    const babyDocs = await getDocs(itemsRef);
    const babies = await getBabiesFromBabyDocs(babyDocs);
    return babies;
  } catch (error) {
    throw new FailedToFetchError(docType);
  }
}

export const addNewChild = async (child: Baby) => {
  let caretakerRef = child.caretakerID
    ? doc(db, caregiverPath, child.caretakerID)
    : null;
  let newBaby = null;
  try {
    newBaby = await addDoc(collection(db, path), {
      ...child,
      dob: child.dob,
      createdAt: serverTimestamp(),
      caretaker: caretakerRef,
      babyBookEntries: [],
    });
  } catch (error) {
    throw new FailedToAddError(docType);
  }

  addBabyToCaretaker(child.caretakerID, newBaby);
  return newBaby;
};

export async function updateBaby(uid: string, baby: any) {
  const babyDoc = doc(db, path, uid);
  try {
    await updateDoc(babyDoc, baby);
  } catch (error) {
    throw new FailedToEditError(docType);
  }
}

export const editBaby = async (baby: any) => {
  const babyID = baby.id;
  const newCaretakerID = baby.caretakerID;
  delete baby.id;

  const babyRef = doc(db, path, babyID);
  const babySnapshot = await getDoc(babyRef);
  const oldCaretakerID = babySnapshot.data()?.caretakerID;
  updateBaby(babyID, baby);
  addBabyToCaretaker(newCaretakerID, babyRef);
  removeBabyFromCaretaker(oldCaretakerID, babyRef);
};

export const deleteBaby = async (baby: any) => {
  const babyID = baby.id;
  const babyRef = doc(db, path, babyID);
  const babySnapshot = await getDoc(babyRef);
  const caretakerID = babySnapshot.data()?.caretakerID;

  try {
    await deleteDoc(babyRef);
  } catch (error) {
    throw new FailedToDeleteError(docType);
  }

  removeBabyFromCaretaker(caretakerID, babyRef);
};
