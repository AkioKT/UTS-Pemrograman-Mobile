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

  // 🔥 NEW: recent activity
  const [recentActivity, setRecentActivity] = useState(null);

  useEffect(() => {
    loadProgress();
    loadRecentActivity();
  }, []);

  // LOAD SAVED PROGRESS
  const loadProgress = async () => {
    const saved = await AsyncStorage.getItem("progress");
    if (saved) setProgress(JSON.parse(saved));
  };

  // LOAD RECENT ACTIVITY
  const loadRecentActivity = async () => {
    const saved = await AsyncStorage.getItem("recentActivity");
    if (saved) setRecentActivity(JSON.parse(saved));
  };

  // UPDATE PROGRESS PERSENTASE
  const updateProgress = async (category, percent) => {
    const newProgress = { ...progress, [category]: percent };
    setProgress(newProgress);
    await AsyncStorage.setItem("progress", JSON.stringify(newProgress));
  };

  // 🔥 NEW: UPDATE RECENT ACTIVITY
  const updateRecentActivity = async (data) => {
    setRecentActivity(data);
    await AsyncStorage.setItem("recentActivity", JSON.stringify(data));
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        recentActivity,
        updateRecentActivity,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
