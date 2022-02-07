import React from "react";
import { auth } from "../../config/firebase";
import PrimaryButton from "./PrimaryButton";

export default function LogoutButton({ onPress }: { onPress?: () => void }) {
  return (
    <PrimaryButton
      text="Log Out"
      onPress={() => {
        auth.signOut();
        onPress && onPress();
      }}
    />
  );
}
