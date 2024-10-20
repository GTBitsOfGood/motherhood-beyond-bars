import { collection, getDocs } from "firebase/firestore";
import { db } from "db/firebase";

import { Waiver } from "@lib/types/common";

// TODO add error checking
export async function getWaivers() {
  const waiverQuery = collection(db, "waivers");
  const waiverDocs = await getDocs(waiverQuery);
  const waivers = waiverDocs.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        id: doc.id,
      } as Waiver)
  );

  return waivers;
}
