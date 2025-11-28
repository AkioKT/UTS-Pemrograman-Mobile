import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
} from "react-native";
import styles from '../styles/ProfileScreen'
export const ResetStats = ({ onReset }) => (
  <TouchableOpacity style={styles.resetButton} onPress={onReset}>
    <Text style={styles.resetButtonText}>Reset Stats</Text>
  </TouchableOpacity>
);

export default ResetStats;