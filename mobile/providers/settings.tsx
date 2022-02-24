import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

type RequestableItems = {
  itemName: string;
  itemDisplayName: string;
  itemDescription: string;
  maxQuantity?: number;
};

type AppConfigSettings = {
  contact: {
    phone?: string;
  };
  items?: [RequestableItems];
};

const defaultSettings: AppConfigSettings = {
  contact: {},
};

export type SettingsContextType = AppConfigSettings;
export const SettingsContext =
  React.createContext<SettingsContextType>(defaultSettings);

export const SettingsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [appSettings, setAppSettings] =
    useState<SettingsContextType>(defaultSettings);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "app", "settings"), (doc) => {
      if (appSettings !== doc.data()) {
        setAppSettings(doc.data() as SettingsContextType);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SettingsContext.Provider value={appSettings}>
      {children}
    </SettingsContext.Provider>
  );
};
