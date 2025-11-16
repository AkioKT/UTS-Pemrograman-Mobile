import styles from "./styles/ProgressOverview";
import { View, Text } from "react-native";
import { useContext, useMemo } from "react";
import { ProgressContext } from "../../../context/ProgressOverview";
import WaveBackground from "../hooks/WaveBackground";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function ProgressOverview() {
  const { progress } = useContext(ProgressContext);

  const totalProgressPercent = useMemo(() => {
    const vals = Object.values(progress);
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100);
  }, [progress]);
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.card}>
      <WaveBackground
        height={310}
        waveHeight="65%"
        waveOpacity={{ w1: 0.5, w2: 0.25, w3: 0.18 }}
      />
      <View style={{ position: "absolute", width: "100%", padding: 10 }}>
        <Text style={styles.sectionTitle}>Progress Overview</Text>

        {Object.entries(progress).map(([category, value]) => (
          <View key={category} style={{ marginBottom: 8 }}>
            <View style={styles.row}>
              <Text style={styles.smallText}>{category}</Text>
              <Text style={styles.smallText}>{Math.round(value * 100)}%</Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, { width: `${value * 100}%` }]}
              />
            </View>
          </View>
        ))}

        <Text style={styles.smallText}>Overall: {totalProgressPercent}%</Text>
      </View>
    </View>
  );
}
