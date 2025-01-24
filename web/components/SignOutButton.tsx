import React from "react";
import { auth } from "db/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // For clearing cookies
import Button from "./atoms/Button";

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

  return <Button text="Log out" type="tertiary" onClick={logout} />;
}

export default SignOutButton;
