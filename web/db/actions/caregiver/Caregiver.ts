import { doc, updateDoc } from "firebase/firestore";

import { db } from "db/firebase";
import { Caregiver } from "@lib/types/users";

export async function updateCaregiver(uid: string, caregiver: Partial<Caregiver>) {
  const caregiverDoc = doc(db, "caregivers", uid);

  // TODO catch errors
  updateDoc(caregiverDoc, caregiver as Partial<Caregiver>);
}
