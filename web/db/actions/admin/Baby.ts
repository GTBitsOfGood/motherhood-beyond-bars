import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  doc,
  serverTimestamp,
  updateDoc,
  query,
} from "firebase/firestore";

import { Baby } from "@lib/types/baby";

import { db } from "db/firebase";
import { PaginationInfoType, PaginationReferencesType } from "@lib/types/common";
import { BABIES_COLLECTION_PATH, CAREGIVERS_COLLECTION_PATH } from "db/consts";
import { getQueryConstraintsFromPagination } from "@lib/utils/pagination";
import getBabiesFromBabyDocs from "@lib/utils/baby";

const path = BABIES_COLLECTION_PATH;
const caregiverPath = CAREGIVERS_COLLECTION_PATH;

export async function getBabyPage(pageNumber: number, paginationReferences: PaginationReferencesType) {
  const constraints = getQueryConstraintsFromPagination(path, pageNumber, paginationReferences);
  const itemsRef = query(collection(db, path), ...constraints);
  const babyDocs = await getDocs(itemsRef);
  const babies = await getBabiesFromBabyDocs(babyDocs);
  const paginationInfo: PaginationInfoType = {pageNumber: pageNumber, startAfter: babyDocs?.docs[babies.length - 1]}
  return {data: babies, paginationInfo: paginationInfo};
}

export async function getCaregiversInfo() {
  const q = query(collection(db, caregiverPath));
  const res = await getDocs(q);

  const caregivers = res.docs.map((doc) => ({
    id: doc.id,
    name: doc.data()["firstName"] + " " + doc.data()["lastName"],
  }));

  return caregivers;
}

export const addNewChild = async (child: Baby) => {
  let caretakerRef = null;
  if (child.caretakerID) {
    caretakerRef = doc(db, caregiverPath, child.caretakerID);
  }

  const newBaby = await addDoc(collection(db, path), {
    ...child,
    dob: child.dob,
    createdAt: serverTimestamp(),
    caretaker: caretakerRef,
    babyBookEntries: [],
  });

  if (caretakerRef) {
    await updateDoc(caretakerRef, {
      baby: newBaby,
    });
  }
};

export const editBaby = async (baby: any) => {
  // TODO find out why deleting baby.id and if needed
  const babyID = baby.id;
  delete baby.id;
  await updateDoc(doc(db, path, babyID), baby);
};

export const deleteBaby = async (baby: any) => {
  const babyID = baby.id;
  await deleteDoc(doc(db, path, babyID));
};
