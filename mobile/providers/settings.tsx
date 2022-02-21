import { doc, onSnapshot } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../config/firebase";

type RequestableItems = {
  itemName: string;
  itemDisplayName: string;
  itemDescription: string;
  maxQuantity?: number;
};

type AppConfigSettings = {
  settings: {
    contact: {
      phone?: string;
    };
    items?: [RequestableItems];
  };
};

const defaultSettings: AppConfigSettings = {
  settings: {
    contact: {},
  },
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

  onSnapshot(doc(db, "app", "settings"), (doc) => {
    setAppSettings(doc.data() as SettingsContextType);
  });

  return (
    <SettingsContext.Provider value={appSettings}>
      {children}
    </SettingsContext.Provider>
  );
};
