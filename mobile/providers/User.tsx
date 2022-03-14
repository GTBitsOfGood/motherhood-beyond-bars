import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { Caregiver } from "../types";

export type UserContextType =
  | (Pick<User, "email" | "displayName" | "emailVerified" | "uid"> & {
      caregiver?: Caregiver;
    })
  | null;
export const UserContext = React.createContext<UserContextType>(null);

export const UserProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [authData, setAuthData] = useState<UserContextType>(null);

  const unsubs: (() => void)[] = [];
  useEffect(() => {
    unsubs.push(
      onAuthStateChanged(auth, async (user) => {
        if (!user || user?.uid === authData?.uid) {
          return;
        }
        console.log("auth state changed");

        if (user) {
          const caregiverRef = doc(db, `caregivers/${user.uid}`);

          // Used if the caregiver has not yet been created
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
            unsubs.push(
              onSnapshot(caregiverRef, (snapshot) => {
                setAuthData({
                  ...{
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                    uid: user.uid,
                  },
                  caregiver: {
                    ...(snapshot.data() as Caregiver),
                    id: user.uid,
                  },
                });
              })
            );
          } catch (e) {
            // Caregiver doesn't exist

            // First, set the doc so that the caregiver does exist
            await setDoc(caregiverRef, caregiverData);

            // Then, remake the snapshot listener
            unsubs.push(
              onSnapshot(caregiverRef, (snapshot) => {
                setAuthData({
                  ...{
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified,
                    uid: user.uid,
                  },
                  caregiver: {
                    ...(snapshot.data() as Caregiver),
                    id: user.uid,
                  },
                });
              })
            );
          }
        } else {
          setAuthData(null);
        }
      })
    );

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, []);

  return (
    <UserContext.Provider value={authData}>{children}</UserContext.Provider>
  );
};
