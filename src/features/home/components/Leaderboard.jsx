import styles from "./styles/Leaderboard";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import WaveBackground from "../hooks/WaveBackground";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function Leaderboard() {
  const leaderboardMock = [
    { id: "u1", name: "Galang", xp: 980 },
    { id: "u2", name: "Nadia", xp: 920 },
    { id: "u3", name: "Sukma", xp: 880 },
  ];
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  return (
    <View style={styles.card}>
      <WaveBackground
        height={160}
        waveHeight="126%"
        waveOpacity={{ w1: 0.5, w2: 0.25, w3: 0.18 }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          padding: 10,
          height: "100%",
        }}
      >
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        {leaderboardMock.map((u, idx) => (
          <View key={u.id} style={styles.row}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={styles.leaderIdx}>{idx + 1}</Text>
              <Text style={styles.leaderName}>{u.name}</Text>
            </View>
            <View>
              <Text style={styles.leaderXp}>{u.xp} XP</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
