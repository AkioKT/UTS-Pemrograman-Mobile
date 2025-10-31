import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LivesContext = createContext();

export const LivesProvider = ({ children }) => {
  const [lives, setLives] = useState(3); // default 3 nyawa

  // 🔹 Ambil nyawa dari storage saat pertama kali dijalankan
  useEffect(() => {
    const loadLives = async () => {
      try {
        const storedLives = await AsyncStorage.getItem("lives");
        if (storedLives !== null) {
          setLives(parseInt(storedLives, 10));
        }
      } catch (error) {
        console.log("Error loading lives:", error);
      }
    };
    loadLives();
  }, []);

  // 🔹 Simpan setiap kali nyawa berubah
  useEffect(() => {
    AsyncStorage.setItem("lives", lives.toString());
  }, [lives]);

  // 🔹 Kurangi nyawa
  const loseLife = async (amount = 1) => {
    setLives((prev) => Math.max(prev - amount, 0));
  };

  // 🔹 Reset nyawa (jika kamu ingin restart)
  const resetLives = async () => {
    setLives(3);
    await AsyncStorage.setItem("lives", "3");
  };

  return (
    <LivesContext.Provider value={{ lives, loseLife, resetLives }}>
      {children}
    </LivesContext.Provider>
  );
};
