import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function LivesDisplay({
  lives,
  maxLives,
  secondsToNext,
  onAddLife,
  heartSize = 22,
}) {
  const hearts = [];
  for (let i = 0; i < maxLives; i++) {
    hearts.push(
      <Text
        key={i}
        style={[
          styles.heart,
          i < lives ? styles.heartFull : styles.heartEmpty,
          { fontSize: heartSize },
        ]}
      >
        {i < lives ? "❤️" : "🤍"}
      </Text>
    );
  }

  function formatCountdown(s) {
    if (s === null) return "";
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.heartsRow}>{hearts}</View>
      <View style={styles.metaRow}>
        {secondsToNext !== null && lives < maxLives ? (
          <Text style={styles.timerText}>Next in {formatCountdown(secondsToNext)}</Text>
        ) : (
          <Text style={styles.timerText}>{lives >= maxLives ? "Full" : ""}</Text>
        )}
        <TouchableOpacity style={styles.addBtn} onPress={onAddLife}>
          <Text style={styles.addBtnText}>+1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  heartsRow: { flexDirection: "row", marginVertical: 6 },
  heart: { marginHorizontal: 4 },
  heartFull: { opacity: 1 },
  heartEmpty: { opacity: 0.4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  timerText: { fontSize: 12, color: "#333" },
  addBtn: {
    backgroundColor: "#2f80ed",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },
});
