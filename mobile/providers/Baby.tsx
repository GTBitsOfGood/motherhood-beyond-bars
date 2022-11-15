import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Baby } from "../types";
import { UserContext } from "./User";

export type BabyContextType = Baby | null;
export const BabyContext = React.createContext<BabyContextType>(null);

export const BabyProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const userContext = React.useContext(UserContext);
  const [baby, setBaby] = useState<Baby | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    async function getData() {
      // Get baby id
      const caregiverRef = doc(db, "caregivers", userContext?.uid as string);
      const ref = query(
        collection(db, "babies"),
        where("caretaker", "==", caregiverRef),
        limit(1)
      );

      unsubscribe = onSnapshot(ref, (snapshot) => {
        if (snapshot.docs.length === 0) {
          console.log("No baby found");

          setBaby(null);
          return;
        }
        const babyDoc = snapshot.docs[0];

        const babyData = {
          ...babyDoc.data(),
          id: babyDoc.id,
        } as Baby;

        setBaby(babyData as Baby);
      });
    }
    getData();
    return () => {
      // unsubscribe if it exists
      unsubscribe?.();
    };
  }, [userContext]);

  return <BabyContext.Provider value={baby}>{children}</BabyContext.Provider>;
};
