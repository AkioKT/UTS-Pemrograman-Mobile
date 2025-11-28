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

  // Load stored progress & recent activity when app starts
  useEffect(() => {
    loadProgress();
    loadRecentActivity();
  }, []);

  // ------------------------------------
  // 🔹 LOAD SAVED PROGRESS
  // ------------------------------------
  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem("progress");
      if (saved) {
        console.log("Loaded progress:", saved);
        setProgress(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Error loading progress:", error);
    }
  };

  // ------------------------------------
  // 🔹 UPDATE PROGRESS AND SAVE IT
  // ------------------------------------
  const updateProgress = async (category, percent) => {
    try {
      const newProgress = { ...progress, [category]: percent };
      setProgress(newProgress);
      await AsyncStorage.setItem("progress", JSON.stringify(newProgress));
      console.log("Progress saved:", newProgress);
    } catch (error) {
      console.log("Error saving progress:", error);
    }
  };

  // ------------------------------------
  // 🔹 LOAD RECENT ACTIVITY
  // ------------------------------------
  const loadRecentActivity = async () => {
    try {
      const saved = await AsyncStorage.getItem("recentActivity");
      if (saved) setRecentActivity(JSON.parse(saved));
    } catch (error) {
      console.log("Error loading recent activity:", error);
    }
  };

  // ------------------------------------
  // 🔹 UPDATE RECENT ACTIVITY
  // ------------------------------------
  const updateRecentActivity = async (data) => {
    try {
      setRecentActivity(data);
      await AsyncStorage.setItem("recentActivity", JSON.stringify(data));
    } catch (error) {
      console.log("Error saving recent activity:", error);
    }
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
