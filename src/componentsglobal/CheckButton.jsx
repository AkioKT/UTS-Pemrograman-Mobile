import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../style/Q1Style";

export default function CheckButton({ onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.checkButton, disabled && styles.checkButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.checkButtonText}>CHECK</Text>
    </TouchableOpacity>
  );
}
