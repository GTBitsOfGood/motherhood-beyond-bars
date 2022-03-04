import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { Caregiver } from "../types";

export type UserContextType = (User & { caregiver?: Caregiver }) | null;
export const UserContext = React.createContext<UserContextType>(null);

export const UserProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [authData, setAuthData] = useState<UserContextType>(null);

  let unsub = () => {};
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const caregiverRef = doc(db, `caregivers/${user.uid}`);
      let caregiverData: any = {
        name: user.displayName,
        id: user.uid,
        signedWaivers: [],
        address: "",
        itemsRequested: [],
        city: "",
        zipCode: "",
        state: "",
        contact: "",
      } as Caregiver;
      try {
        // unsub = onSnapshot(caregiverRef,(doc) => {
        //   caregiverData = {
        //     ...(doc.data()),
        //     id: doc.id
        //   }
        // })
        caregiverData = {
          ...(await getDoc(caregiverRef)).data(),
          id: user.uid,
        };
      } catch (e) {
        console.log(e);
        await setDoc(caregiverRef, caregiverData);
        // caregiver doc doesn't exist
      }

      const data = {
        ...user,
        caregiver: { ...caregiverData } as Caregiver,
      };
      setAuthData(data); // also include caregiver's babies
    } else {
      setAuthData(null);
    }
  });

  return (
    <UserContext.Provider value={authData}>{children}</UserContext.Provider>
  );
};
