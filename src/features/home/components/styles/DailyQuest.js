import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

export default StyleSheet.create({
  card: {
    backgroundColor: "#0f1724",
    borderRadius: 12,
    height: 300,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
    position: "relative",
  },
  sectionTitle: {
    color: "#171717",
    fontSize: 26 * SCALE,
    fontFamily: "Pixel-Bold",
    textAlign: "center",
  },
  questRow: {
    borderRadius: 6,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  questTitle: {
    color: "#171717",
    fontFamily: "Pixel-SemiBold",
    fontSize: 14 * SCALE,
  },
  questReward: {
    color: "#171717",
    fontSize: 14 * SCALE,
    fontFamily: "Pixel-SemiBold",
  },
  questBtn: {
    backgroundColor: "#e9e9e9ff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});
