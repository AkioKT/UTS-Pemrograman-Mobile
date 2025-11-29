import { Audio } from "expo-av";

const ButtonClick = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/Button_Click.mp3")
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

export default ButtonClick;
