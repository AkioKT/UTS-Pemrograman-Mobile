import styles from "./styles/WeeklyChallenge";
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import WaveBackground from "../hooks/WaveBackground";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function WeeklyChallenge() {
  const weeklyChallengeMock = {
    title: "Kompetisi Minggu: Frontend Sprint",
    goal: "Selesaikan 10 soal HTML/CSS",
    reward: "Badge: Frontender",
    progress: 0.3,
  };
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity
      style={styles.weeklyChallengeCard}
      onPress={() => Alert.alert("Weekly Challenge", weeklyChallengeMock.title)}
      activeOpacity={0.8}
    >
      <WaveBackground
        height={110}
        // colors={["#533483", "#6D44B8", "#8E5CF3"]}
        waveHeight="180%"
        waveOpacity={{ w1: 0.5, w2: 0.25, w3: 0.18 }}
      />
      {/* CONTENT */}
      <View style={{ width: 300, position: "absolute", top: 10, left: 10 }}>
        <Text
          style={[
            styles.sectionTitle,
            { color: "white", fontFamily: "Poppins-Bold" },
          ]}
        >
          Weekly Challenge
        </Text>
        <View style={{ gap: 6 }}>
          <Text
            style={[
              styles.cardSub,
              { color: "white", fontFamily: "Poppins-Regular" },
            ]}
          >
            {weeklyChallengeMock.title}
          </Text>

          {/* PROGRESS BAR */}
          <View
            style={[
              styles.progressBarBg,
              { backgroundColor: "rgba(255,255,255,0.2)" },
            ]}
          >
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${weeklyChallengeMock.progress * 100}%`,
                  backgroundColor: "#a78bfa",
                },
              ]}
            />
          </View>

          <Text
            style={[
              styles.smallText,
              {
                // marginTop: 6,
                color: "white",
                fontFamily: "Poppins-Regular",
                opacity: 0.8,
              },
            ]}
          >
            Reward: {weeklyChallengeMock.reward}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
