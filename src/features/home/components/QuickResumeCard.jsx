import styles from "./styles/QuickResumeCard";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CircularDiagram from "../../../componentsglobal/CircularDiagram";
import WaveBackground from "../hooks/WaveBackground";
import { useContext } from "react";
import { ProgressContext } from "../../../context/ProgressOverview";
import allLevels from "../../../../assets/data/HTML/AllLevel";

export default function QuickResumeCard() {
  const navigation = useNavigation();
  const { recentActivity } = useContext(ProgressContext);
  const level = Number(recentActivity?.lesson?.match(/\d+/)?.[0] ?? 0);
  const levelMinusOne = level - 1;
  const totalLevel = Object.keys(allLevels).length;
  const progress = (levelMinusOne * 100) / totalLevel;

  return (
    <View style={styles.quickresumecard}>
      <WaveBackground height={200}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
            // backgroundColor: "red"
          }}
        >
          <View>
            <Text style={styles.cardTitle}>
              {recentActivity?.course ?? "No recent session"}
            </Text>
            <Text style={styles.cardSub}>Level: {levelMinusOne}</Text>
            <Text style={styles.cardSub}>Progress: {progress}%</Text>
          </View>
          <CircularDiagram progress={recentActivity?.progress ?? 0} />
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[styles.continueBtn]}
            onPress={() => {
              if (!recentActivity) return;

              navigation.navigate("LearningScreen", {
                levelId: recentActivity.levelId,
              });
            }}
          >
            <Text style={[styles.continueText, { fontFamily: "Poppins-Bold" }]}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </WaveBackground>
    </View>
  );
}
