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
  courseCard: {
    backgroundColor: "#071427",
    padding: 12,
    borderRadius: 10,
    marginRight: 12,
    width: 200,
  },
  courseTitle: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  courseLevel: {
    color: "#9ca3af",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    marginBottom: 8,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: "#111827",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 12,
    backgroundColor: "#facc15",
  },
});
