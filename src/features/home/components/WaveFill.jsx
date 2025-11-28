import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Path, Defs, ClipPath, Rect } from "react-native-svg";

export default function WaveFill({
  progress,
  width = 80,
  height = 140,
  waveHeight = 10,
  speed = 3000,
}) {
  const horizontalAnim = useRef(new Animated.Value(0)).current;
  const verticalAnim = useRef(new Animated.Value(0)).current;

  // ========== Horizontal Wave Movement ==========
  useEffect(() => {
    Animated.loop(
      Animated.timing(horizontalAnim, {
        toValue: 1,
        duration: speed,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // ========== Vertical Up-Down Wave (floating) ==========
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(verticalAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(verticalAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Horizontal movement
  const translateX = horizontalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, 0],
  });

  // Vertical floating movement
  const translateY = verticalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 6], // naik–turun 6px
  });

  // Wave path
  const waveWidth = width;
  const amplitude = waveHeight;
  const wavePath = `
    M 0 ${amplitude}
    Q ${waveWidth / 4} 0, ${waveWidth / 2} ${amplitude}
    T ${waveWidth} ${amplitude}
    V ${height}
    H 0
    Z
  `;

  // clip area mengikuti progress
  const clipHeight = height * (1 - progress);

  return (
    <Svg width={width} height={height}>
      <Defs>
        <ClipPath id="clip">
          <Rect x="0" y={clipHeight} width={width} height={height} />
        </ClipPath>
      </Defs>

      <Animated.View
        style={{
          position: "absolute",
          width: waveWidth * 2,
          height,
          transform: [
            { translateX },
            { translateY }, // naik turun
          ],
        }}
      >
        <Svg width={waveWidth * 2} height={height}>
          <Path
            d={wavePath}
            fill="#4fa3ff"
            opacity={0.8}
            clipPath="url(#clip)"
          />
          <Path
            d={wavePath}
            fill="#4fa3ff"
            opacity={0.4}
            y={5}
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
    </Svg>
  );
}
