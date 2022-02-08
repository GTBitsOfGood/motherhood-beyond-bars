import { doc, DocumentSnapshot, getDoc, Timestamp } from "firebase/firestore";
import { db } from ".";

/**
 * A helper function to get a document from the database
 * @param path
 * @returns {Promise<DocumentSnapshot>} the document
 */
export async function getDocument(path: string) {
  // get firestore document that matches the path
  try {
    const docRef = doc(db, path);
    const res = await getDoc(docRef);
    return res;
  } catch (e) {
    console.log("couldn't get path", path);
  }
}

/**
 * Adds the id to the document snapshot
 * @param doc
 * @returns
 */
export function formatDoc<T = any>(doc: DocumentSnapshot) {
  type WithTimestamp = T & { lastUpdated?: Timestamp };
  const data = doc.data() as WithTimestamp;

  const lastUpdated = data?.lastUpdated
    ? (data?.lastUpdated.toDate() as Date)
    : null;
  const final = { ...(data as T), id: doc.id } as T & {
    lastUpdated?: Date | string;
  };
  if (lastUpdated) {
    final.lastUpdated = lastUpdated.toJSON();
  }
  return final;
}
