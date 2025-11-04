import styles from "../../../style/HomeScreenStyle";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LivesContext } from "../../../context/LivesContext"; // sesuaikan path
// import untuk navigasi jika perlu
import { useNavigation } from "@react-navigation/native";

export default function DailyQuest() {
  const [xp, setXp] = useState(420);
  const dailyQuestsMock = [
    {
      id: "d1",
      title: "Selesaikan 2 level HTML",
      reward: "10 XP",
      done: false,
    },
    {
      id: "d2",
      title: "Jawab 5 soal benar tanpa salah",
      reward: "1 ❤",
      done: false,
    },
    { id: "d3", title: "Main 15 menit latihan", reward: "5 XP", done: true },
  ];
  const completeDailyQuest = (id) => {
    setDailyQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, done: true } : q))
    );
    // pseudo reward: add xp or life
    const q = dailyQuests.find((x) => x.id === id);
    if (q?.reward?.includes("XP")) setXp((v) => v + parseInt(q.reward));
    if (q?.reward?.includes("❤")) {
      // no direct access to context's setter here; show alert for demo
      Alert.alert("Reward", `Kamu mendapatkan ${q.reward}`);
    }
  };
  const [dailyQuests, setDailyQuests] = useState(dailyQuestsMock);
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Daily Quest</Text>
      {dailyQuests.map((q) => (
        <View key={q.id} style={styles.questRow}>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.questTitle,
                q.done && {
                  textDecorationLine: "line-through",
                  color: "#8b949e",
                },
              ]}
            >
              {q.title}
            </Text>
            <Text style={styles.questReward}>{q.reward}</Text>
          </View>
          <TouchableOpacity
            style={[styles.questBtn, q.done && { backgroundColor: "#2a2a2a" }]}
            onPress={() => completeDailyQuest(q.id)}
          >
            <Text style={styles.questBtnText}>{q.done ? "Done" : "Claim"}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
