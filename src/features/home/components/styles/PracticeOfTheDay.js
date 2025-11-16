import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    // height: 340,
    backgroundColor: "#0f1724",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 8,
    fontFamily: "Poppins-Bold",
  },
  cardSub: {
    color: "#f9f9f9",
    fontSize: 14,
    marginBottom: 12,
    fontFamily: "Poppins-Regular",
  },
  choiceBtn: {
    backgroundColor: "#0b1220",
    padding: 10,
    borderRadius: 4,
    marginVertical: 6,
  },
  choiceSelected: {
    borderWidth: 1,
    borderColor: "#facc15",
  },
  choiceText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },
  primaryBtn: {
    backgroundColor: "#facc15",
    borderRadius: 4,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#121212",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  ghostBtn: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  ghostBtnText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  correctText: {
    color: "#4ade80",
    marginTop: 8,
  },
  wrongText: {
    color: "#fb7185",
    marginTop: 8,
  },
});
