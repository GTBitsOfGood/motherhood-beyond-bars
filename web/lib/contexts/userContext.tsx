import { auth } from "@lib/firebase";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export type UserContextType = {
  user: User | null | undefined;
  admin: boolean | null;
};

export const UserContext = React.createContext<UserContextType>({
  user: null,
  admin: null,
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState<boolean | null>(null);

  async function onChange(user: User | null) {
    if (user) {
      const tokenId = await user.getIdTokenResult(true);

      setAdmin(Boolean(tokenId.claims.admin));
    } else {
      setAdmin(null);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, admin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
