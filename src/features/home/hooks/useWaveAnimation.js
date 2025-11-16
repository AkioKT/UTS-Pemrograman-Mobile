import { useEffect, useRef, useMemo } from "react";
import { Animated } from "react-native";

export default function useWaveAnimation() {
  return {
    translateX1: 0,
    translateX2: 0,
    translateX3: 0,
  };
}

// export default function useWaveAnimation() {
//   const wave1 = useRef(new Animated.Value(0)).current;
//   const wave2 = useRef(new Animated.Value(0)).current;
//   const wave3 = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(wave1, {
//         toValue: 1,
//         duration: 8000,
//         useNativeDriver: true,
//       })
//     ).start();

//     Animated.loop(
//       Animated.timing(wave2, {
//         toValue: 1,
//         duration: 6000,
//         useNativeDriver: true,
//       })
//     ).start();

//     Animated.loop(
//       Animated.timing(wave3, {
//         toValue: 1,
//         duration: 11000,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, []);

//   // memoize interpolations
//   const translateX1 = useMemo(
//     () =>
//       wave1.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, -400],
//       }),
//     [wave1]
//   );

//   const translateX2 = useMemo(
//     () =>
//       wave2.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, -350],
//       }),
//     [wave2]
//   );

//   const translateX3 = useMemo(
//     () =>
//       wave3.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, -450],
//       }),
//     [wave3]
//   );

//   return { translateX1, translateX2, translateX3 };
// }
