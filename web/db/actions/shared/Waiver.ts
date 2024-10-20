import { FailedToFetchError } from "@lib/exceptions/DatabaseExceptions";
import { Waiver } from "@lib/types/common";
import { db } from "db/firebase";
import { collection, getDocs, query } from "firebase/firestore";

const DOC_TYPE = "waivers";
const PATH = "waivers";

export async function getWaivers(): Promise<Waiver[]> {
  try {
    const itemsRef = query(collection(db, PATH));
    const waiverDocs = await getDocs(itemsRef);
    return waiverDocs.docs.map((doc) => doc.data() as Waiver);
  } catch (error) {
    throw new FailedToFetchError(DOC_TYPE);
  }
}
