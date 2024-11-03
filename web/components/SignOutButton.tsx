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
      className="self-stretch text-mbb-pink text-base font-semibold"
    >
      Log out
    </button>
  );
}

export default SignOutButton;
