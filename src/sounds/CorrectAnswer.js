import { Audio } from "expo-av";   // ← gunakan expo-av, bukan expo-audio

const playCorrectAnswer = async () => {
  try {
    console.log("Memuat suara benar");

    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/Correct_Answer.mp3")
    );

    await sound.playAsync();

    // Opsional: cleanup sound setelah selesai
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.log("Gagal memutar audio:", error);
  }
};

export default playCorrectAnswer;
