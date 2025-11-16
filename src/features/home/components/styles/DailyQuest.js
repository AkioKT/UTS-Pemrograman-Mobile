import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#0f1724",
    borderRadius: 12,
    height: 190,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden"
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Poppins-Bold"
  },
  questRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  questTitle: {
    color: "#fff",
    fontFamily: "Poppins-Regular"
  },
  questReward: {
    color: "#9ca3af",
    fontSize: 12,
    fontFamily: "Poppins-Regular"
  },
  questBtn: {
    backgroundColor: "#facc15",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  questBtnText: {
    color: "#121212",
    fontWeight: "700",
  },
});
