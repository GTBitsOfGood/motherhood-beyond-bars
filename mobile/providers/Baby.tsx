import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { Baby } from "../types";

export type BabyContextType = (Baby & { babies?: Baby }) | null; // unsure if babies? is right
export const BabyContext = React.createContext<BabyContextType>(null);

export const BabyProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [authData, setAuthData] = useState<BabyContextType>(null);

  let unsub = () => {};
  onAuthStateChanged(auth, async (baby) => {
    if (baby) {
      const babyRef = doc(db, `babies/${baby.uid}`);
      let babyData: any = {
          name: baby.displayName,
          id: baby.uid,
          caregiverEmail: String,
          caregiverID: String
      } as unknown as Baby;
      try {
        // unsub = onSnapshot(caregiverRef,(doc) => {
        //   caregiverData = {
        //     ...(doc.data()),
        //     id: doc.id
        //   }
        // })
        babyData = {
          ...(await getDoc(babyRef)).data(),
          id: baby.uid,
        };
      } catch (e) {
        console.log(e);
        await setDoc(babyRef, babyData);
        // baby doc doesn't exist
      }

      const data = {
        ...baby,
        baby: { ...babyData } as Baby,
      };
      setAuthData(data); 
    } else {
      setAuthData(null);
    }
  });

  return (
    <BabyContext.Provider value={authData}>{children}</BabyContext.Provider>
  );
};
