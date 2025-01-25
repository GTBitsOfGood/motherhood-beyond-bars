import { doc, arrayUnion, setDoc } from "firebase/firestore";
import { db } from "db/firebase";

import { WaiverHeader } from "@lib/types/common";

export async function signWaiver(caregiverId: string, waiver: WaiverHeader) {
  const caregiverDoc = doc(db, "caregivers", caregiverId);

  return await setDoc(
    caregiverDoc,
    {
      signedWaivers: arrayUnion(waiver),
    },
    { merge: true }
  )
    .then(() => {
      return { success: true };
    })
    .catch(() => {
      return { success: false };
    });
}
