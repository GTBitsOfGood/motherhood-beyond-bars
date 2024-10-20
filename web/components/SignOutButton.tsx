import React from "react";
import { auth } from "db/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // For clearing cookies

function SignOutButton() {
  const router = useRouter();

  const logout = () => {
    // Sign out from Firebase
    signOut(auth)
      .then(() => {
        // Remove the auth token cookie
        Cookies.remove("authToken", { path: "/" });

        // Redirect to login page after successful sign out
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

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
