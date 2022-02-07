import { StatusBar } from 'expo-status-bar';
import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { auth } from './config/firebase';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export const LoginContext = React.createContext<User | null>(null);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [authData, setAuthData] = useState<User | null>(null);


  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setAuthData(user); // also include caregiver's babies
    } else {
      setAuthData(null);
    }
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <LoginContext.Provider value={authData}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </LoginContext.Provider>
      </SafeAreaProvider>
    );
  }
}
