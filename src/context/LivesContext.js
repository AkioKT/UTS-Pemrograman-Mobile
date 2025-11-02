import React, { createContext, useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LivesContext = createContext();

export const LivesProvider = ({ children }) => {
  const MAX_LIVES = 5;
  const REGEN_TIME = 5 * 60 * 1000; // 5 menit dalam ms

  const [lives, setLives] = useState(5);
  const [nextLifeTime, setNextLifeTime] = useState(null);
  const timerRef = useRef(null);

  // 🔹 Load lives & timer saat app dibuka
  useEffect(() => {
    const loadLives = async () => {
      try {
        const storedLives = await AsyncStorage.getItem("lives");
        const storedTime = await AsyncStorage.getItem("nextLifeTime");

        if (storedLives !== null) setLives(parseInt(storedLives, 10));

        if (storedTime) {
          const time = parseInt(storedTime, 10);

          // jika ada timer tersimpan, cek apakah sudah lewat
          if (Date.now() >= time) {
            restoreLivesFromTime(time);
          } else {
            setNextLifeTime(time);
            startLifeRegenTimer(time);
          }
        }
      } catch (error) {
        console.log("Error loading lives:", error);
      }
    };

    loadLives();
  }, []);

  // 🔹 Simpan setiap perubahan lives
  useEffect(() => {
    AsyncStorage.setItem("lives", lives.toString());
  }, [lives]);

  // ✅ Function: kurangi nyawa
  const loseLife = async (amount = 1) => {
    setLives((prev) => {
      const updated = Math.max(prev - amount, 0);

      if (prev > 0 && updated < prev) {
        if (updated < MAX_LIVES && !nextLifeTime) {
          const newTime = Date.now() + REGEN_TIME;
          setNextLifeTime(newTime);
          AsyncStorage.setItem("nextLifeTime", newTime.toString());
          startLifeRegenTimer(newTime);
        }
      }
      return updated;
    });
  };

  // ✅ Tambahkan nyawa
  const addLife = (amount = 1) => {
    setLives((prev) => Math.min(prev + amount, MAX_LIVES));
  };

  // ✅ Mulai timer regen
  const startLifeRegenTimer = (time) => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (Date.now() >= time) {
        restoreLivesFromTime(time);
      }
    }, 1000);
  };

  // ✅ Hitung dan kembalikan nyawa berdasarkan waktu tersimpan
  const restoreLivesFromTime = async (storedTime) => {
    if (!storedTime) return;

    const diff = Date.now() - storedTime;
    const livesToAdd = Math.floor(diff / REGEN_TIME) + 1;

    setLives((prev) => {
      const updated = Math.min(prev + livesToAdd, MAX_LIVES);

      if (updated === MAX_LIVES) {
        clearInterval(timerRef.current);
        setNextLifeTime(null);
        AsyncStorage.removeItem("nextLifeTime");
        return updated;
      }

      const newTime = storedTime + livesToAdd * REGEN_TIME;
      setNextLifeTime(newTime);
      AsyncStorage.setItem("nextLifeTime", newTime.toString());
      startLifeRegenTimer(newTime);

      return updated;
    });
  };

  // ✅ Reset nyawa (optional)
  const resetLives = async () => {
    setLives(MAX_LIVES);
    setNextLifeTime(null);
    await AsyncStorage.removeItem("nextLifeTime");
  };

  return (
    <LivesContext.Provider
      value={{ lives, loseLife, addLife, nextLifeTime, resetLives }}
    >
      {children}
    </LivesContext.Provider>
  );
};
