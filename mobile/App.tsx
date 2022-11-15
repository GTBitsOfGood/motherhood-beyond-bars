import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { UserProvider, BabyProvider } from "./providers";
import { BabyBookProvider } from "./providers/BabyBook";
import { SettingsProvider } from "./providers/settings";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <BabyProvider>
            <BabyBookProvider>
              <SettingsProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SettingsProvider>
            </BabyBookProvider>
          </BabyProvider>
        </UserProvider>
      </SafeAreaProvider>
    );
  }
}
