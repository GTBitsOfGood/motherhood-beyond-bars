import { StatusBar } from "expo-status-bar";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { auth } from "./config/firebase";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { UserProvider } from "./providers";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </UserProvider>
      </SafeAreaProvider>
    );
  }
}
