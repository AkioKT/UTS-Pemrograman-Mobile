import { Audio } from "expo-av";

const SelectCharacter = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/Select_Character.mp3")
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

export default SelectCharacter;
