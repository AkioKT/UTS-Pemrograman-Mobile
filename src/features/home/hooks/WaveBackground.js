import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";
import useWavesAnimation from "./useWaveAnimation";

export default function WaveBackground({
  children,
  height = "100%",
  waveHeight = "100%",
  waveOpacity = { w1: 0.3, w2: 0.2, w3: 0.15 },
  colors = ["#1A1A2E", "#16213E", "#533483"],
  style,
}) {
  const { translateX1, translateX2, translateX3 } = useWavesAnimation();

  return (
    <View style={[{ height }, style]}>
      {/* Background */}
      <View style={[StyleSheet.absoluteFillObject]}>
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        {/* Wave 1 */}
        <Animated.View
          style={[
            styles.wave,
            {
              height: waveHeight,
              opacity: waveOpacity.w1,
              transform: [{ translateX: translateX1 }],
            },
          ]}
        >
          <Svg height="100%" width="800" viewBox="0 0 800 200">
            <Path
              d="M0,100 Q100,50 200,100 T400,100 T600,100 T800,100 L800,200 L0,200 Z"
              fill="rgba(255,255,255,0.2)"
            />
          </Svg>
        </Animated.View>

        {/* Wave 2 */}
        <Animated.View
          style={[
            styles.wave,
            {
              height: waveHeight,
              opacity: waveOpacity.w2,
              transform: [{ translateX: translateX2 }],
            },
          ]}
        >
          <Svg height="100%" width="700" viewBox="0 0 700 200">
            <Path
              d="M0,120 Q90,70 180,120 T360,120 T540,120 T700,120 L700,200 L0,200 Z"
              fill="rgba(255,255,255,0.5)"
            />
          </Svg>
        </Animated.View>

        {/* Wave 3 */}
        <Animated.View
          style={[
            styles.wave,
            {
              height: waveHeight,
              opacity: waveOpacity.w3,
              transform: [{ translateX: translateX3 }],
            },
          ]}
        >
          <Svg height="100%" width="900" viewBox="0 0 900 200">
            <Path
              d="M0,130 Q110,80 220,130 T440,130 T660,130 T900,130 L900,200 L0,200 Z"
              fill="rgba(255,255,255,0.4)"
            />
          </Svg>
        </Animated.View>
      </View>

      {/* CHILDREN */}
      <View style={{ flex: 1, zIndex: 1 }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
