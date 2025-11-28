import { View, Text, Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/ProfileScreen";

export const SettingsPreferences = ({
  theme,
  setTheme,
  sound,
  setSound,
  music,
  setMusic,
  language,
  setLanguage,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Settings & Preferences</Text>

      {/* Theme */}
      <Text style={styles.label}>Theme</Text>
      <Picker selectedValue={theme} onValueChange={setTheme}>
        <Picker.Item label="Light" value="light" />
        <Picker.Item label="Dark" value="dark" />
      </Picker>

      {/* Sound */}
      <View style={styles.row}>
        <Text style={styles.label}>Sound</Text>
        <Switch value={sound} onValueChange={setSound} />
      </View>

      {/* Music */}
      <View style={styles.row}>
        <Text style={styles.label}>Music</Text>
        <Switch value={music} onValueChange={setMusic} />
      </View>

      {/* Language */}
      <View style>
        <Text style={styles.label}>Language</Text>
        <Picker selectedValue={language} onValueChange={setLanguage}>
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Indonesia" value="id" />
        </Picker>
      </View>
    </View>
  );
};

export default SettingsPreferences;
