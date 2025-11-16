import React, { useContext, useEffect, useMemo, useState } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LivesContext } from "../../../context/LivesContext"; // sesuaikan path
// import untuk navigasi jika perlu
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/AnnouncementBanner";

export default function AnnouncementBanner() {
  const announcements = [
    { id: "a1", text: "JavaScript Intermediate rilis hari ini!" },
    { id: "a2", text: "Event CodeCrack Cup dimulai besok — ikut ya!" },
    { id: "a3", text: "Dapatkan 2x XP weekend ini." },
  ];

  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    // rotate announcement every 6s
    const t = setInterval(() => {
      setAnnouncementIndex((i) => (i + 1) % announcements.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <TouchableOpacity
      style={styles.announcement}
      onPress={() =>
        Alert.alert("Announcement", announcements[announcementIndex].text)
      }
    >
      <Ionicons name="megaphone-outline" size={18} color="#fff" />
      <Text style={styles.announcementText}>
        {announcements[announcementIndex].text}
      </Text>
    </TouchableOpacity>
  );
}
