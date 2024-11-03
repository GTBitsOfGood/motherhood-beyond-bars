import { doc, Timestamp, updateDoc } from "@firebase/firestore";
import { db } from "db/firebase";

import { Caregiver } from "@lib/types/users";
import { Item, ItemRequest } from "@lib/types/items";

export async function requestItems(
  caregiver: Caregiver,
  items: Item[],
  comments: string
) {
  const requestedItems = items.filter((item) => item.checked);

  const request: ItemRequest = {
    created: Timestamp.now(),
    updated: Timestamp.now(),
    additionalComments: [comments],
    status: "Pending",
    items: caregiver.itemsRequested
      ? [...caregiver.itemsRequested.items, ...requestedItems]
      : requestedItems,
  };

  await updateDoc(doc(db, "caregivers", caregiver.id), {
    itemsRequested: request,
  });

  return request.items as Item[];
}
