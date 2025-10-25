import React from "react";
import { Audio } from "expo-av";
const playCorrectAnswer = async () => {
  console.log("Memuat suara...");
  const { sound } = await Audio.Sound.createAsync(
    require("../../assets/sounds/Correct_Answer.mp3")
  );
  await sound.playAsync();
};

export default playCorrectAnswer;
