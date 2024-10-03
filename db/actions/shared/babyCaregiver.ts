import {
  arrayRemove,
  arrayUnion,
  DocumentData,
  DocumentReference,
  increment,
} from "firebase/firestore";
import { updateCaregiver } from "../admin/Caregiver";
import { updateBaby } from "../admin/Baby";

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
