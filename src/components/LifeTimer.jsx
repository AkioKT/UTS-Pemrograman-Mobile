import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { LivesContext } from "../context/LivesContext";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

export default function LifeTimer() {
  const { lives, nextLifeTime } = useContext(LivesContext);
  const [timeLeft, setTimeLeft] = useState(0);

  const [fontsLoaded] = useFonts({
    Poppins: require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (!nextLifeTime) {
      setTimeLeft("");
      return;
    }

    const interval = setInterval(() => {
      const diff = nextLifeTime - Date.now();

      if (diff <= 0) {
        setTimeLeft("00:00");
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [nextLifeTime]);

  if (lives >= 5) {
    return (
      <Text style={{ color: "#ff4b4bff", fontSize: 18, fontFamily: "Poppins" }}>
        ❤️ {lives}
      </Text>
    );
  }

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <FontAwesome name="heart" size={24} color="#fff" />
      <Text
        style={{
          color: "#ff4b4bff",
          fontSize: 18,
          fontFamily: "Poppins",
        }}
      >
        {lives}
      </Text>
    </View>
  );
}
