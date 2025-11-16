import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  quickresumecard: {
    borderRadius: 12,
    width: "100%",
    height: 200,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
  },

  cardTitle: {
    color: "#f9f9f9",
    fontSize: 30,
    fontFamily: "Poppins-Bold",
  },

  cardSub: {
    width: "100%",
    color: "#f9f9f9",
    fontSize: 14,
    fontFamily: "Poppins-Regular"
  },

  continueBtn: {
    backgroundColor: "#e9e9e9",
    width: 300,
    height: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  continueText: {
    color: "#171717",
    width: "100%",
    fontSize: 16,
    textAlign: "center"
  },
});

export default styles;
