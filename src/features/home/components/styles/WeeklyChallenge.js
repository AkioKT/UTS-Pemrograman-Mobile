import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  weeklyChallengeCard: {
    borderRadius: 12,
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
    height: 110, // kamu bisa atur ulang
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
  },

  cardSub: {
    color: "#f9f9f9",
    fontSize: 14,
  },

  progressBarBg: {
    height: 10,
    backgroundColor: "#111827",
    borderRadius: 8,
    overflow: "hidden",
  },

  progressBarFill: {
    height: 10,
    backgroundColor: "#facc15",
  },

  smallText: {
    color: "#9ca3af",
    fontSize: 12,
  },
});

export default styles;
