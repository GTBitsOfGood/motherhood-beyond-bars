import React from "react";
import { auth } from "db/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

function SignOutButton() {
  const router = useRouter();

  const logout = () => {
    signOut(auth);
    router.push("/login");
  };

  return (
    <button
      onClick={logout}
      className="self-stretch text-mbb-pink text-base font-semibold"
    >
      Log out
    </button>
  );
}

export default SignOutButton;
