import {
  arrayRemove,
  arrayUnion,
  DocumentData,
  DocumentReference,
  getDocs,
  increment,
} from "firebase/firestore";
import { getCaregiver, updateCaregiver } from "../admin/Caregiver";
import { updateBaby } from "../admin/Baby";
import getBabiesFromBabyDocs from "@lib/utils/baby";

export async function addBabyToCaretaker(caretakerID: string, babyRef: any) {
  if (!caretakerID) return;
  const updates = {
    babies: arrayUnion(babyRef),
    babyCount: increment(1),
  };
  updateCaregiver(caretakerID, updates);
}

export async function removeBabyFromCaretaker(
  caretakerID: string,
  babyRef: any
) {
  if (!caretakerID) return;

  const updates = {
    babies: arrayRemove(babyRef),
    babyCount: increment(-1),
  };

  await updateCaregiver(caretakerID, updates);
}

export async function removeCaretakerFromBabies(
  babiesToRemove: DocumentReference<DocumentData>[]
) {
  const updatePromises = babiesToRemove.map(async (babyRef) => {
    return updateBaby(babyRef.id, {
      caretaker: null,
      caretakerName: null,
    });
  });

  await Promise.all(updatePromises);
}

export async function getBabiesFromCaregiver(caretakerID: string) {
  if (!caretakerID) return null;

  const caregiverDoc = await getCaregiver(caretakerID);
  if (!caregiverDoc?.exists()) {
    return null;
  }

  const caregiverData = caregiverDoc.data();
  const babyRefs = caregiverData?.babies || [];
  const babyDocs = await getDocs(babyRefs);
  const babies = await getBabiesFromBabyDocs(babyDocs as any);
  return babies;
}
