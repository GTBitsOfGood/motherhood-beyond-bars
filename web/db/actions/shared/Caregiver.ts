import { doc, updateDoc } from "firebase/firestore";

import { Caregiver } from "@lib/types/users";
import { db } from "db/firebase";

export async function updateCaregiver(
  uid: string,
  caregiver: Partial<Caregiver>
) {
  const caregiverDoc = doc(db, "caregivers", uid);

  // TODO catch errors
  updateDoc(caregiverDoc, caregiver as Partial<Caregiver>);
}
