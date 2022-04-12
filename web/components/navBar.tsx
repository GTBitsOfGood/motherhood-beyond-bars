import React, { useContext } from "react";
import { auth } from "@lib/firebase";
import { signOut } from "firebase/auth";
import { UserContext } from "@lib/contexts/userContext";

function NavBar() {
  const { user } = useContext(UserContext);

  const logout = () => {
    signOut(auth);
  };

  if (!user) return null;

  return (
    <div className="p-5">
      <button onClick={logout}>Sign out</button>
    </div>
  );
}

export default NavBar;
