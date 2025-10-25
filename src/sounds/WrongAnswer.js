import React from "react";
import { Audio } from "expo-av";

const playWrongAnswer = async () => {
  console.log("Memuat suara...");
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/sounds/Wrong_Answer.mp3")
  );
  await sound.playAsync();
};

export default playWrongAnswer;
