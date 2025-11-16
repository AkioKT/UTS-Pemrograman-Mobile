import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#0f1724",
    borderRadius: 12,
    marginBottom: 12,
    // height: 140,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  row: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    // gap: 20
  },
  leaderIdx: {
    color: "#facc15",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  leaderName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  leaderXp: {
    color: "#9ca3af",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});
