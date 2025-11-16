import styles from "./styles/RecommendedCoursesStyle";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import WaveBackground from "../hooks/WaveBackground";
import useCustomFonts from "../../../hooks/useCustomFonts";

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
      <WaveBackground
        height={150}
        waveHeight="135%"
        waveOpacity={{ w1: 0.5, w2: 0.25, w3: 0.18 }}
      />
      <View style={{ position: "absolute", width: "100%", zIndex: 1, padding: 10 }}>
        <Text style={styles.sectionTitle}>Recommended for you</Text>
        <FlatList
          horizontal
          data={recommendedMock}
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.courseCard}
              onPress={() =>
                navigation.navigate("MainTabs", { screen: "Learn" })
              }
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
    </View>
  );
}
