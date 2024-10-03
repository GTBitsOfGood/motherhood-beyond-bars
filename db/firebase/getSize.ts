import { collection } from "firebase/firestore";
import { db } from ".";
import { getCountFromServer } from "@firebase/firestore";
import {
  GenericDatabaseErrorException,
  PathNotFoundError,
} from "@lib/exceptions/DatabaseExceptions";
import { CollectionPath } from "@lib/types/db";

export async function getTotalRecords(path: CollectionPath) {
  try {
    const coll = collection(db, path);
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (e) {
    if (e instanceof Error && e.message.includes("path")) {
      throw new PathNotFoundError(path);
    }
    throw new GenericDatabaseErrorException();
  }
}
