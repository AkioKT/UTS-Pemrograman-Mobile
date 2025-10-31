import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@app_lives";
const LAST_REFILL_KEY = "@app_last_refill";

export default function useLives({
  maxLives = 5,
  refillIntervalMinutes = 30, // 1 nyawa setiap 30 menit (ubah sesuai kebutuhan)
  initialLives = 5,
} = {}) {
  const [lives, setLives] = useState(initialLives);
  const [secondsToNext, setSecondsToNext] = useState(null);
  const intervalRef = useRef(null);

  const REFILL_MS = refillIntervalMinutes * 60 * 1000;

  // Load stored values and apply refill logic
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const lastRefillStr = await AsyncStorage.getItem(LAST_REFILL_KEY);
        let storedLives = stored ? parseInt(stored, 10) : initialLives;
        let lastRefill = lastRefillStr ? parseInt(lastRefillStr, 10) : Date.now();

        const now = Date.now();
        // jumlah refill yang terjadi sejak lastRefill
        const elapsed = now - lastRefill;
        if (elapsed >= REFILL_MS) {
          const refillCount = Math.floor(elapsed / REFILL_MS);
          storedLives = Math.min(maxLives, storedLives + refillCount);
          // geser lastRefill ke depan sesuai refillCount
          lastRefill = lastRefill + refillCount * REFILL_MS;
        }

        if (mounted) {
          setLives(storedLives);
          // simpan updated state
          await AsyncStorage.setItem(STORAGE_KEY, String(storedLives));
          await AsyncStorage.setItem(LAST_REFILL_KEY, String(lastRefill));
          updateSecondsToNext(lastRefill);
        }
      } catch (e) {
        console.warn("useLives load error:", e);
      }
    }

    load();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update timer tiap detik untuk UI countdown
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      AsyncStorage.getItem(LAST_REFILL_KEY)
        .then((last) => {
          const lastRefill = last ? parseInt(last, 10) : Date.now();
          updateSecondsToNext(lastRefill);
        })
        .catch(() => {});
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lives]);

  function updateSecondsToNext(lastRefill) {
    const now = Date.now();
    if (lives >= maxLives) {
      setSecondsToNext(null);
      return;
    }
    const nextRefillAt = lastRefill + REFILL_MS;
    const secs = Math.max(0, Math.ceil((nextRefillAt - now) / 1000));
    setSecondsToNext(secs);
  }

  async function persist(lv, lastRefill = null) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, String(lv));
      if (lastRefill !== null) {
        await AsyncStorage.setItem(LAST_REFILL_KEY, String(lastRefill));
      }
    } catch (e) {
      console.warn("useLives persist error:", e);
    }
  }

  // panggil saat mengurangi 1 nyawa (mis. jawaban salah)
  const loseLife = async (count = 1) => {
    const newLives = Math.max(0, lives - count);
    setLives(newLives);
    // jika sebelumnya sudah full, set lastRefill supaya refill dimulai sekarang
    if (lives === maxLives) {
      const now = Date.now();
      await persist(newLives, now);
      updateSecondsToNext(now);
    } else {
      await persist(newLives); // lastRefill tetap sama
    }
    return newLives;
  };

  const addLife = async (count = 1) => {
    const newLives = Math.min(maxLives, lives + count);
    setLives(newLives);
    // jika tambah membuatnya full, hapus lastRefill (atau set ke now)
    if (newLives >= maxLives) {
      await persist(newLives, Date.now());
      setSecondsToNext(null);
    } else {
      await persist(newLives);
    }
    return newLives;
  };

  // refill manual — dipanggil dari timer/cek ketika app dibuka
  const applyRefillIfNeeded = async () => {
    try {
      const lastStr = await AsyncStorage.getItem(LAST_REFILL_KEY);
      let lastRefill = lastStr ? parseInt(lastStr, 10) : Date.now();
      const now = Date.now();
      const elapsed = now - lastRefill;
      if (elapsed >= REFILL_MS && lives < maxLives) {
        const refillCount = Math.floor(elapsed / REFILL_MS);
        const newLives = Math.min(maxLives, lives + refillCount);
        lastRefill = lastRefill + refillCount * REFILL_MS;
        setLives(newLives);
        await persist(newLives, lastRefill);
        updateSecondsToNext(lastRefill);
      }
    } catch (e) {
      console.warn("applyRefillIfNeeded error", e);
    }
  };

  // fungsi reset (untuk development/testing)
  const resetLives = async () => {
    const now = Date.now();
    setLives(maxLives);
    await persist(maxLives, now);
    updateSecondsToNext(now);
  };

  return {
    lives,
    maxLives,
    secondsToNext,
    loseLife,
    addLife,
    applyRefillIfNeeded,
    resetLives,
  };
}
