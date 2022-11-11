import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Waiver } from "../types";

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
