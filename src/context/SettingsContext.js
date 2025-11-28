import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    theme: "light",
    sound: true,
    music: true,
    language: "en",
  });

  // Load dari storage saat awal aplikasi terbuka
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("user_settings");
        if (saved) setSettings(JSON.parse(saved));
      } catch (e) {
        console.log("Error loading settings", e);
      }
    })();
  }, []);

  // Save setiap kali setting berubah
  useEffect(() => {
    AsyncStorage.setItem("user_settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
