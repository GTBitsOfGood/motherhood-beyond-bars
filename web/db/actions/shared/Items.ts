// db/actions/shared/Items.ts

import { FailedToFetchError } from "@lib/exceptions/DatabaseExceptions";
import { Item } from "@lib/types/items";
import { db } from "db/firebase";
import { doc, DocumentReference, getDoc } from "firebase/firestore";

const APP_COLLECTION = "app";
const APP_DOC_ID = "items"; // Updated with your actual app document ID

export async function getItems(): Promise<Item[]> {
  try {
    // Get the app document
    const appDocRef = doc(db, APP_COLLECTION, APP_DOC_ID);
    const appDocSnap = await getDoc(appDocRef);

    if (!appDocSnap.exists()) {
      throw new FailedToFetchError("App document does not exist");
    }

    // Get the items array from the app document
    const data = appDocSnap.data();
    const itemsRefs = data?.items as DocumentReference[];

    if (!itemsRefs || itemsRefs.length === 0) {
      return []; // Return an empty array if there are no items
    }

    // Fetch all items by their references
    const itemsPromises = itemsRefs.map(async (itemRef) => {
      const itemDocSnap = await getDoc(itemRef);
      if (itemDocSnap.exists()) {
        return { id: itemDocSnap.id, ...itemDocSnap.data() } as Item;
      } else {
        // Handle the case where the item document does not exist
        return null;
      }
    });

    const items = await Promise.all(itemsPromises);

    // Filter out any nulls (in case some item documents did not exist)
    return items.filter((item) => item !== null) as Item[];
  } catch (error) {
    throw new FailedToFetchError("items");
  }
}
