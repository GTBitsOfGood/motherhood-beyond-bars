import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getMetadata } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
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
    console.log('userid', userContext?.uid);
    

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
      unsubscribe && unsubscribe();
    };
  }, [userContext]);

  return <BabyContext.Provider value={baby}>{children}</BabyContext.Provider>;
};
