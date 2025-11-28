import { View, StyleSheet } from "react-native";
import Svg, {
  Circle,
  G,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { useContext } from "react";
import { ProgressContext } from "../context/ProgressOverview";

export default function CircularDiagram() {
  const { recentActivity } = useContext(ProgressContext);
  // Ambil level menjadi angka
  const levelNumber = Number(recentActivity?.lesson?.match(/\d+/)?.[0] ?? 1);
  // Progress diagram mengikuti level (misal max level = 10)
  const progress = Math.min((levelNumber / 11) * 100, 100);
  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const level = Number(recentActivity?.lesson?.match(/\d+/)?.[0] ?? 0);
  const levelMinusOne = level - 1;
  // const fontsLoaded = useCustomFonts();
  // if (!fontsLoaded) return null;

  const simulateProgress = () => {
    const newXP = currentXP + 150;
    if (newXP >= maxXP) {
      setCurrentLevel(currentLevel + 1);
      setCurrentXP(newXP - maxXP);
      setMaxXP(maxXP + 200);
    } else {
      setCurrentXP(newXP);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Svg width={150} height={150}>
          <G rotation="-90" origin="100, 100">
            {/* Background Circle */}
            <Circle
              cx="130"
              cy="80"
              r={radius}
              stroke="#f9f9f9"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            {/* Progress Circle */}
            <Circle
              cx="130"
              cy="80"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>

          {/* Gradient Definition */}
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#4573c9" />
              {/* <Stop offset="100%" stopColor="#4facfe" /> */}
            </LinearGradient>
          </Defs>

          {/* Level Text */}
          <SvgText
            x="80"
            y="70"
            fontSize="28"
            fontFamily="Poppins-Bold"
            fill="#fff"
            textAnchor="middle"
          >
            {levelMinusOne}
          </SvgText>

          {/* Level Label */}
          <SvgText
            x="80"
            y="90"
            fontSize="12"
            fontFamily="Poppins-Regular"
            fill="#fff"
            textAnchor="middle"
          >
            LEVEL
          </SvgText>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    // backgroundColor: "blue",
    // height: 300,
    // width: 00,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 30,
  },
});
