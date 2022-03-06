import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { getMetadata } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { Baby } from "../types";

export type BabyContextType = Baby | null;
export const BabyContext = React.createContext<BabyContextType>(null);

export const BabyProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {

  const [baby, setBaby] = useState<Baby | null>(null);
  const ref = doc(db, "babies/4tzVD1aHglb287A9UHgC"); // change this to specific baby

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    async function getData() {
      unsubscribe = onSnapshot(ref, (snapshot) => {

        const babyData = {
        ... snapshot.data(),
        id: snapshot.id
        } as Baby
        console.log(babyData);
        setBaby(babyData as Baby);
      });
      
    }
    getData();
    return () => {
      // unsubscribe if it exists
      unsubscribe && unsubscribe()
    }
  }, [])

  
  
  return (
    <BabyContext.Provider value={baby}>{children}</BabyContext.Provider>
  );
};
