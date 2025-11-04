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

export default function Leaderboard() {
  const leaderboardMock = [
    { id: "u1", name: "bahlil", xp: 980 },
    { id: "u2", name: "galang", xp: 920 },
    { id: "u3", name: "ayu", xp: 880 },
  ];
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Leaderboard</Text>
      {leaderboardMock.map((u, idx) => (
        <View key={u.id} style={styles.row}>
          <Text style={styles.leaderIdx}>{idx + 1}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.leaderName}>{u.name}</Text>
          </View>
          <Text style={styles.leaderXp}>{u.xp} XP</Text>
        </View>
      ))}
    </View>
  );
}
