import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import WaveBackground from "../hooks/WaveBackground";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function CodingTips() {
  const tipsMock = [
    "Gunakan === daripada == di JavaScript untuk menghindari type coercion.",
    "Sematkan alt pada tag <img> untuk aksesibilitas.",
    "Gunakan semantic tags (<header>, <main>, <footer>) untuk struktur yang jelas.",
  ];
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  return (
    <View style={styles.card}>
      <WaveBackground
        height={110}
        // colors={["#533483", "#6D44B8", "#8E5CF3"]}
        waveHeight="185%"
        waveOpacity={{ w1: 0.5, w2: 0.25, w3: 0.18 }}
      />
      <View style={{ position: "absolute", padding: 10 }}>
        <Text style={styles.sectionTitle}>Coding Tip of The Day</Text>
        <Text style={styles.cardSub}>{tipsMock[0]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0f1724",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden"
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  cardSub: {
    color: "#f9f9f9",
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
});
