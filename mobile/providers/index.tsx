import React, { useState, createContext } from "react";

interface Context {
  user: any;
  setUser: (user: any) => void;
}

export const AuthenticatedUserContext = createContext<Context>({
  user: null,
  setUser: (user) => null,
});

export const AuthenticatedUserProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
