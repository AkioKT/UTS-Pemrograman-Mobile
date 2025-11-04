import styles from "../../../style/HomeScreenStyle";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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

export default function QuickResumeCard() {
  const navigation = useNavigation();
  const [recentActivity, setRecentActivity] = useState({
    course: "HTML",
    lesson: "Intro to tags",
    progress: 0.45,
  });
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MainTabs", { screen: "Learn" })}
      activeOpacity={0.9}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            Continue: {recentActivity.course}
          </Text>
          <Text style={styles.cardSub}>Lesson: {recentActivity.lesson}</Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${recentActivity.progress * 100}%` },
              ]}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate("MainTabs", { screen: "Learn" })}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
