// db/actions/admin/Items.ts

import {
  FailedToAddError,
  FailedToDeleteError,
  FailedToEditError,
} from "@lib/exceptions/DatabaseExceptions";
import { Item } from "@lib/types/items";
import { db } from "db/firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";

const ITEMS_COLLECTION = "items";
const APP_COLLECTION = "app";
const APP_DOC_ID = "items"; // Updated with your actual app document ID

export async function addItem(newItemData: Item): Promise<Item> {
  try {
    // Add new item to the items collection
    const itemsCollectionRef = collection(db, ITEMS_COLLECTION);
    const newItemDocRef = await addDoc(itemsCollectionRef, newItemData);

    // Add the new item's reference to the items array in the app document
    const appDocRef = doc(db, APP_COLLECTION, APP_DOC_ID);
    await updateDoc(appDocRef, {
      items: arrayUnion(newItemDocRef as DocumentReference),
    });

    // Return the new item with the assigned id
    return { ...newItemData, id: newItemDocRef.id };
  } catch (error) {
    throw new FailedToAddError("item");
  }
}

export async function deleteItem(itemId: string): Promise<void> {
  try {
    // Get a reference to the item document
    const itemDocRef = doc(db, ITEMS_COLLECTION, itemId);

    // Delete the item document
    await deleteDoc(itemDocRef);

    // Remove the item's reference from the items array in the app document
    const appDocRef = doc(db, APP_COLLECTION, APP_DOC_ID);
    await updateDoc(appDocRef, {
      items: arrayRemove(itemDocRef as DocumentReference),
    });
  } catch (error) {
    throw new FailedToDeleteError("item");
  }
}

export async function editItem(
  itemId: string,
  updatedData: Partial<Item>
): Promise<void> {
  try {
    const itemDocRef = doc(db, ITEMS_COLLECTION, itemId);
    await updateDoc(itemDocRef, updatedData);
  } catch (error) {
    throw new FailedToEditError("item");
  }
}
