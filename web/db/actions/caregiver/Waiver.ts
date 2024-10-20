import { doc, arrayUnion, Timestamp, setDoc } from "firebase/firestore";
import { db } from "db/firebase";

import { Caregiver } from "@lib/types/users";
import { Waiver } from "@lib/types/common";

// TODO add error checking
export async function setSignedWaivers(caregiver: Caregiver, waiver: Waiver) {
  const caregiverDoc = doc(db, "caregivers", caregiver.id);

  setDoc(
    caregiverDoc,
    {
      signedWaivers: arrayUnion({
        id: waiver.id,
        timestamp: Timestamp.now(),
      }),
    },
    { merge: true }
  );
}
