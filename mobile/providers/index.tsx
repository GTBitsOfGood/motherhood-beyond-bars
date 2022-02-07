import { onAuthStateChanged, User } from "firebase/auth";
import React, { useState, createContext } from "react";
import { auth } from "../config/firebase";

export const UserContext = React.createContext<User | null>(null);

export const UserProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [authData, setAuthData] = useState<User | null>(null);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setAuthData(user); // also include caregiver's babies
    } else {
      setAuthData(null);
    }
  });

  return (
    <UserContext.Provider value={authData}>{children}</UserContext.Provider>
  );
};
