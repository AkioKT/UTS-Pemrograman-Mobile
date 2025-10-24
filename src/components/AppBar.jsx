import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const AppBar = () => {
  // const [lives, setLives] = useState(3);
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // atau tampilkan splash/loading
  }
  return (
    <View style={[styles.appBar, { fontFamily: "Poppins-Thin" }]}>
      <View style={styles.appBarLeft}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleApp}>CodeCrack</Text>
        </View>
      </View>

      {/* <View style={styles.appBarRight}>
        <TouchableOpacity
          style={styles.livesContainer}
          onPress={() => setLives((prev) => (prev > 0 ? prev - 1 : 0))} // contoh interaksi: klik mengurangi nyawa
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <Text
              key={index}
              style={[
                styles.heart,
                { opacity: index < lives ? 1 : 0.2 }, // nyawa yang hilang jadi redup
              ]}
            >
              ❤️
            </Text>
          ))}
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#020617",
    borderBottomWidth: 2, // ubah ke borderTop agar cocok untuk bottom bar
    borderColor: "#334155",
  },
  appBarLeft: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  appBarRight: { flexDirection: "row", alignItems: "center" },
  livesContainer: {
    flexDirection: "row",
    gap: 5,
  },
  menuIcon: {
    color: "#fff",
    fontSize: 32,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  titleApp: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Poppins-Regular"
  }
});

export default AppBar;
