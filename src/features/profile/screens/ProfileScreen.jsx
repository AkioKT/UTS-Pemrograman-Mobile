import React, { useCallback } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderProfile } from "../components/HeaderProfile";
import { SettingsPreferences } from "../components/Settings";
import { HistoryLog } from "../components/History";
import usePersistedState from "../hooks/usePersistedState";
import ResetStorage from '../../../componentsglobal/ResetStorage'
import styles from "../styles/ProfileScreen";

export default function ProfileScreen() {
  const [name, setName] = usePersistedState("profile_name", "");
  const [image, setImage] = usePersistedState("profile_image", null);

  const [theme, setTheme] = usePersistedState("settings_theme", "light");
  const [sound, setSound] = usePersistedState("settings_sound", true);
  const [music, setMusic] = usePersistedState("settings_music", true);
  const [language, setLanguage] = usePersistedState("settings_language", "en");

  const [logs, setLogs] = usePersistedState("user_logs", {
    lastLogin: "2025-02-01",
    totalPlayTime: 0, // dalam detik
    totalWins: 7,
    totalFails: 4,
  });

  const pickImage = () => {
    // nanti tinggal tambahkan expo-image-picker
  };

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(() => {
        setLogs((prev) => ({
          ...prev,
          totalPlayTime: prev.totalPlayTime + 1,
        }));
      }, 1000);

      return () => clearInterval(interval);
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <HeaderProfile
        name={name}
        setName={setName}
        image={image}
        onPickImage={pickImage}
      />

      <SettingsPreferences
        theme={theme}
        setTheme={setTheme}
        sound={sound}
        setSound={setSound}
        music={music}
        setMusic={setMusic}
        language={language}
        setLanguage={setLanguage}
      />

      <HistoryLog logs={logs} />
      <ResetStorage/>
    </ScrollView>
  );
}
