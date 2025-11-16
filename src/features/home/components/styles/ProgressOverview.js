import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
  },
  smallText: {
    color: "#9ca3af",
    fontSize: 12,
    fontFamily: "Poppins-Regular"
  },
  progressBarBg: {
    height: 16,
    backgroundColor: "#111827",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 4,
  },
  progressBarFill: {
    height: 16,
    backgroundColor: "#facc15",
  },
});
