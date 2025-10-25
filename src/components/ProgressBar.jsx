import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

export default function ProgressBar({ progress }) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress, // progress dari 0 → 1
      duration: 500, // durasi animasi 0.5 detik
      useNativeDriver: false, // karena mengubah width
    }).start();
  }, [progress]);

  const widthInterpolated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.progressContainer}>
      <Animated.View
        style={[styles.progressBar, { width: widthInterpolated }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    width: "60%",
    height: 14,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
});
