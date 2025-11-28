// src/context/ThemeContext.js
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

const STORAGE_KEY = "@codecrack_settings";

const defaultSettings = {
  theme: "dark", // "dark" | "light"
  sound: true,
  music: true,
  language: "ID", // "ID" | "EN"
  // history example fields (you can update these from game screens)
  history: {
    lastLogin: null,
    totalPlayMs: 0,
    totalWins: 0,
    totalFails: 0,
  },
};

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setSettings((s) => ({ ...s, ...JSON.parse(raw) }));
        }
      } catch (e) {
        console.warn("Failed to load settings", e);
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // persist settings when they change
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings)).catch((e) =>
      console.warn("Failed to save settings", e)
    );
  }, [settings, hydrated]);

  const setTheme = (theme) =>
    setSettings((s) => ({ ...s, theme: theme === "light" ? "light" : "dark" }));
  const setSound = (v) => setSettings((s) => ({ ...s, sound: !!v }));
  const setMusic = (v) => setSettings((s) => ({ ...s, music: !!v }));
  const setLanguage = (lang) => setSettings((s) => ({ ...s, language: lang }));
  const updateHistory = (fnOrObj) =>
    setSettings((s) => {
      const nextHistory =
        typeof fnOrObj === "function"
          ? fnOrObj(s.history)
          : { ...s.history, ...fnOrObj };
      return { ...s, history: nextHistory };
    });

  return (
    <ThemeContext.Provider
      value={{
        settings,
        hydrated,
        setTheme,
        setSound,
        setMusic,
        setLanguage,
        updateHistory,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
