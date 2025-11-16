import styles from "./styles/DailyQuest";
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { LivesContext } from "../../../context/LivesContext";
import WaveBackground from "../hooks/WaveBackground";
import useCustomFonts from "../../../hooks/useCustomFonts";
import AlertAddLife from "./AlertAddLife";

export default function DailyQuest({ onRewardHeart }) {
  const { addLife } = useContext(LivesContext); // <── gunakan LivesContext
  const [showAlert, setShowAlert] = useState(false);
  const [xp, setXp] = useState(420);

  const [dailyQuests, setDailyQuests] = useState([
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
    {
      id: "d3",
      title: "Main 15 menit latihan",
      reward: "5 XP",
      done: false,
    },
  ]);

  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  const completeDailyQuest = (id) => {
    setDailyQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, done: true } : q))
    );

    const quest = dailyQuests.find((q) => q.id === id);
    if (!quest) return;

    // 🔹 Reward XP
    if (quest.reward.includes("XP")) {
      const amount = parseInt(quest.reward);
      setXp((prev) => prev + amount);
      Alert.alert("Reward", `+${amount} XP berhasil ditambahkan`);
    }

    // 🔹 Reward Heart ❤
    if (quest.reward.includes("❤")) {
      const amount = parseInt(quest.reward);
      addLife(amount, true);
      if (onRewardHeart) onRewardHeart(); // ⬅️ kirim sinyal ke HomeScreen
    }
  };

  return (
    <View style={styles.card}>
      <WaveBackground height={190} waveHeight="107%" />

      <View
        style={{ position: "absolute", zIndex: 1, width: "100%", padding: 10 }}
      >
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
              style={[
                styles.questBtn,
                q.done && { backgroundColor: "#2a2a2a" },
              ]}
              disabled={q.done}
              onPress={() => completeDailyQuest(q.id)}
            >
              <Text style={styles.questBtnText}>
                {q.done ? "Done" : "Claim"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Optional menampilkan XP player */}
        <Text style={{ color: "#fff", marginTop: 10 }}>Your XP: {xp}</Text>
      </View>
    </View>
  );
}
