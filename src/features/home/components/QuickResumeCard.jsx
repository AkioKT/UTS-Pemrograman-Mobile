import styles from "./styles/QuickResumeCard";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CircularDiagram from "../../../componentsglobal/CircularDiagram";
import ContinueCardIcon from "../../../../assets/image/continuecard-icon.png";
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
      <Image source={ContinueCardIcon} style={{ width: "100%", height: 200 }} />
      <View
        style={{
          width: "100%",
          height: 200,
          position: "absolute",
          // backgroundColor: "red",
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
          <Text style={styles.cardTitle}>
            {recentActivity?.course ?? "No recent"}
          </Text>
          <Text style={styles.cardSub}>Level: {levelMinusOne}</Text>
          <Text style={styles.continueText}>Tap to continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
