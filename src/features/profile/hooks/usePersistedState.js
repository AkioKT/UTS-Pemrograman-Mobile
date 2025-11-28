import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const loadState = async () => {
      try {
        const saved = await AsyncStorage.getItem(key);
        if (saved !== null) {
          setState(JSON.parse(saved));
        }
      } catch (error) {
        console.log("Error loading state:", key, error);
      }
    };

    loadState();
  }, [key]);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.log("Error saving state:", key, error);
      }
    };

    saveState();
  }, [key, state]);

  return [state, setState];
}
