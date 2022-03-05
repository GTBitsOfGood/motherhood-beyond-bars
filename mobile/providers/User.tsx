import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { Caregiver } from "../types";

export type UserContextType =
  | (Pick<User, "email" | "displayName" | "emailVerified" | "uid"> & {
      caregiver?: Caregiver;
    } & { reloadCaregiver: () => void })
  | null;
export const UserContext = React.createContext<UserContextType>(null);

export const UserProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [authData, setAuthData] = useState<UserContextType>(null);

  const reloadCaregiver = async () => {
    if (!authData) return;
    const caregiverRef = doc(db, `caregivers/${authData.uid}`);
    const newCaregiverData = (await getDoc(caregiverRef)).data() as Caregiver;
    // setAuthData({
    //   ...user,
    //   caregiver: newCaregiverData,
    //   reloadCaregiver,
    // });
  };

  onAuthStateChanged(auth, async (user) => {
    if (!user || user?.uid === authData?.uid) {
      return;
    }
    console.log("auth state changed");

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
        ...{
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          uid: user.uid,
        },
        caregiver: { ...caregiverData } as Caregiver,
        reloadCaregiver,
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