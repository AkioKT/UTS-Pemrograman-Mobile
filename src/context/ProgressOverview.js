import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState({
    HTML: 0,
    CSS: 0,
    JS: 0,
    Python: 0,
    PHP: 0,
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const saved = await AsyncStorage.getItem("progress");
    if (saved) setProgress(JSON.parse(saved));
  };

  const updateProgress = async (category, percent) => {
    const newProgress = { ...progress, [category]: percent };
    setProgress(newProgress);
    await AsyncStorage.setItem("progress", JSON.stringify(newProgress));
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};