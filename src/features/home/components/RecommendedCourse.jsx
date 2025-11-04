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

export default function RecommendedCourses() {
  const recommendedMock = [
    { id: "c1", title: "HTML: Forms", level: "Beginner", progress: 0.1 },
    {
      id: "c2",
      title: "CSS: Flexbox basics",
      level: "Beginner",
      progress: 0.0,
    },
    { id: "c3", title: "JS: Variables", level: "Beginner", progress: 0.02 },
  ];
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Recommended for you</Text>
      <FlatList
        horizontal
        data={recommendedMock}
        keyExtractor={(i) => i.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.courseCard}
            onPress={() => navigation.navigate("MainTabs", { screen: "Learn" })}
          >
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseLevel}>{item.level}</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${item.progress * 100}%` },
                ]}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
