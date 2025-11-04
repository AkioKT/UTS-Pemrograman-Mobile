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

export default function WeeklyChallenge() {
  const weeklyChallengeMock = {
    title: "Kompetisi Minggu: Frontend Sprint",
    goal: "Selesaikan 10 soal HTML/CSS",
    reward: "Badge: Frontender",
    progress: 0.3,
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Alert.alert("Weekly Challenge", weeklyChallengeMock.title)}
    >
      <Text style={styles.sectionTitle}>Weekly Challenge</Text>
      <Text style={styles.cardSub}>{weeklyChallengeMock.title}</Text>
      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${weeklyChallengeMock.progress * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.smallText}>Reward: {weeklyChallengeMock.reward}</Text>
    </TouchableOpacity>
  );
}
