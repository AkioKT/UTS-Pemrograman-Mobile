import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

export default StyleSheet.create({
  card: {
    backgroundColor: "#0f1724",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 26 * SCALE,
    fontFamily: "Pixel-Bold",
    marginBottom: 10,
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  courseCard: {
    backgroundColor: "#63331b",
    padding: 12,
    borderRadius: 10,
    marginRight: 12,
    width: 200,
    height: 100,
  },
  courseTitle: {
    color: "#fff",
    fontFamily: "Pixel-Bold",
    fontSize: 20 * SCALE,
  },
  courseLevel: {
    color: "#9ca3af",
    fontSize: 16 * SCALE,
    fontFamily: "Pixel-Bold",
    marginBottom: 8,
  },
  progressBarBg: {
    width: "100%",
    height: 25,
    backgroundColor: "#63331b",
    borderRadius: 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#a8a8a87c",
  },

  progressBarFill: {
    height: "100%",
    flexDirection: "row",
    overflow: "hidden",
  },

  stripe: {
    width: 16, // lebar garis hijau
    backgroundColor: "rgba(61, 235, 61, 1)",
    marginRight: 2, // jarak antar garis
    borderRadius: 2,
  },
});
