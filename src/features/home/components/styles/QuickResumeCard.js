import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

const styles = StyleSheet.create({
  quickresumecard: {
    borderRadius: 12,
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
    position: "relative",
  },

  cardTitle: {
    width: "100%",
    color: "#f9f9f9",
    fontSize: 32 * SCALE,
    fontFamily: "Pixel-Bold",
    textAlign: "center",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  cardSub: {
    width: "100%",
    color: "#f9f9f9",
    fontSize: 16 * SCALE,
    fontFamily: "Pixel-Bold",
    textAlign: "center",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },

  continueBtn: {
    // backgroundColor: "red",
    position: "absolute",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 4,
  },

  continueText: {
    color: "#f9f9f9",
    width: "100%",
    fontSize: 20 * SCALE,
    fontFamily: "Pixel-Bold",
    textAlign: "center",
    textShadowColor: "#000", // warna stroke
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});

export default styles;
