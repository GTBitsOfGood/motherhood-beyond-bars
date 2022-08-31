import React, { useContext } from "react";
import { auth } from "@lib/firebase";
import { signOut } from "firebase/auth";
import { UserContext } from "@lib/contexts/userContext";

function SignOutButton() {
  const { user } = useContext(UserContext);

  const logout = () => {
    signOut(auth);
  };

  if (!user) return null;

  return (
    <button
      onClick={logout}
      className="px-8 py-4 flex gap-x-2 text-gray-200 items-center bg-gray-900 w-full"
    >
      Sign out
      <svg
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color="var(--geist-foreground)"
        data-testid="geist-icon"
        shapeRendering="geometricPrecision"
        viewBox="0 0 24 24"
      >
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"></path>
      </svg>
    </button>
  );
}

export default SignOutButton;
