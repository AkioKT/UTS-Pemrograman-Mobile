import { View, Text, StyleSheet } from "react-native";
import WaveBackground from "../hooks/WaveBackground";
import useCustomFonts from "../../../hooks/useCustomFonts";
export default function MascotMessage() {
  return (
    <View style={[styles.card]}>
      <WaveBackground
        height={110}
        // colors={["#533483", "#6D44B8", "#8E5CF3"]}
        waveHeight="185%"
        waveOpacity={{ w1: 0.5, w2: 0.25, w3: 0.18 }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          padding: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Codey says</Text>
          <Text style={styles.cardSub}>
            Jangan lupa istirahat — 5 menit stretch setiap jam!
          </Text>
        </View>
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
    overflow: "hidden",
  },

  mascotCard: {
    backgroundColor: "#07162a",
  },

  cardTitle: {
    color: "#f9f9f9",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },

  cardSub: {
    color: "#f9f9f9",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});
