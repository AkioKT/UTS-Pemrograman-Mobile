import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const SCALE = width / 400; // responsive scale

const styles = StyleSheet.create({
  announcement: {
    backgroundColor: "#0b1220",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  announcementText: { color: "#fff", marginLeft: 8, fontSize: 14 * SCALE },
});

export default styles;
