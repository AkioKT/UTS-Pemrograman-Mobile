import { View, Text } from "react-native";
import styles from "../styles/ProfileScreen";
export const HistoryLog = ({ logs }) => {
  const hours = Math.floor(logs.totalPlayTime / 3600);
  const minutes = Math.floor((logs.totalPlayTime % 3600) / 60);
  const seconds = logs.totalPlayTime % 60;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>History / Logs</Text>

      <Text>Last Login: {logs.lastLogin}</Text>
      <Text>Total Play Time: {minutes} minutes</Text>
      <Text>Total Wins: {logs.totalWins}</Text>
      <Text>Total Fails: {logs.totalFails}</Text>
    </View>
  );
};

export default HistoryLog;
