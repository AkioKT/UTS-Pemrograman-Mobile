import styles from "./styles/Leaderboard";
import { View, Text, Image } from "react-native";
import LeaderboardIcon from "../../../../assets/image/leaderboard-icon.png";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function Leaderboard() {
  const leaderboardMock = [
    { id: "u1", name: "Galang", xp: 980 },
    { id: "u2", name: "Nadia", xp: 920 },
    { id: "u3", name: "Sukma", xp: 880 },
    { id: "u4", name: "Zahra", xp: 880 },
    { id: "u5", name: "Aladawiyah", xp: 880 },
  ];
  return (
    <View style={styles.card}>
      <Image
        source={LeaderboardIcon}
        style={{ width: "100%", height: 400, resizeMode: "cover" }}
      />
      <View
        style={{
          position: "absolute",
          width: 260,
          paddingHorizontal: 12,
          height: 250,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.sectionTitle}>Leaderboard</Text>
        </View>
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
