import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/ProfileScreen";
export const SaveProfile = ({ onSave }) => (
  <TouchableOpacity style={styles.saveButton} onPress={onSave}>
    <Text style={styles.saveButtonText}>Save Profile</Text>
  </TouchableOpacity>
);

export default SaveProfile;