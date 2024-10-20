import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "db/firebase";

import { Caregiver } from "@lib/types/users";
import { Baby, Book } from "@lib/types/baby";

// TODO fix whatever's going on here
// TODO add error checking
export async function getCaregiverBabies(caregiver: Caregiver) {
  let unsubscribe: (() => void) | null = null;
  async function getData() {
    // Get baby id
    const caregiverRef = doc(db, "caregivers", caregiver.id);
    // TODO change limit to more than 1
    const ref = query(
      collection(db, "babies"),
      where("caretaker", "==", caregiverRef),
      limit(1)
    );

    unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.docs.length === 0) {
        return { success: false, baby: null };
      }
      const babyDoc = snapshot.docs[0];

      const babyData = {
        ...babyDoc.data(),
        id: babyDoc.id,
      } as Baby;

      return { success: true, baby: babyData };
    });
  }
  getData();
}

// TODO fix whatever's going on here
// TODO add error checking
export async function getBabyBook(baby: Baby) {
  let unsubscribe: () => void;
  async function fetchBook() {
    const queryRef = query(
      collection(db, "babies", baby.id, "book"),
      orderBy("date", "desc"),
      limit(10)
    );
    unsubscribe = onSnapshot(queryRef, (snapshot) => {
      return snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id } as unknown as Book;
      });
    });
  }
  fetchBook();

  return () => {
    unsubscribe?.();
  };
}
