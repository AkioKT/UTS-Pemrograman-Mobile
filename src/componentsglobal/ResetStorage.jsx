import { TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "lucide-react-native";
import { StyleSheet } from "react-native";

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    alert("Storage berhasil direset!");
  } catch (error) {
    console.log("Gagal menghapus storage:", error);
  }
};

export default function ResetStorage() {
  return (
    <TouchableOpacity onPress={clearStorage}>
      <Text style={styles.textFont}>Reset Storage</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textFont: {
    color: "white",
  },
});
