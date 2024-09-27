import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
} from "firebase/firestore";

import { db } from "db/firebase";

import { PaginationInfoType, PaginationReferencesType } from "@lib/types/common";
import { getQueryConstraintsFromPagination } from "@lib/utils/pagination";
import { CAREGIVERS_COLLECTION_PATH } from "db/consts";
import getCaregiversFromCaregiverDocs from "@lib/utils/caregiver";

const path = CAREGIVERS_COLLECTION_PATH;

export async function getCaregivers() {
  const itemsRef = query(collection(db, path));
  const caregiverDocs = await getDocs(itemsRef);

  const caregivers = await getCaregiversFromCaregiverDocs(caregiverDocs);

  return caregivers;
}


export async function getCaregiverPage(pageNumber: number, paginationReferences: PaginationReferencesType) {
  const constraints = getQueryConstraintsFromPagination(path, pageNumber, paginationReferences)
  const itemsRef = query(collection(db, path), ...constraints);
  const caregiverDocs = await getDocs(itemsRef);
  const caregivers = await getCaregiversFromCaregiverDocs(caregiverDocs);
  const paginationInfo: PaginationInfoType = {pageNumber: pageNumber, startAfter: caregiverDocs?.docs[caregivers.length - 1]}
  return {data: caregivers, paginationInfo: paginationInfo};
}

export const deleteCaretaker = async (caretakerID: string) => {
  // TODO catch errors
  await deleteDoc(doc(db, path, caretakerID));
};
