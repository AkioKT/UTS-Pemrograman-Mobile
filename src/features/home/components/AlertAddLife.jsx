import { useRef, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useCustomFonts from "../../../hooks/useCustomFonts";
export default function AlertAddLife({ onClose }) {
  const slideAnim = useRef(new Animated.Value(50)).current; // posisi awal: turun 50px
  const opacityAnim = useRef(new Animated.Value(0)).current; // opacity awal: 0

  useEffect(() => {
    // Animasi MUNCUL
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0, // fade out
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onClose?.(); // ⬅️ tutup modal dari parent
        });
      }, 1500);
    });
  }, []);

  return (
    <View style={{ position: "absolute", right: 6, top: 6 }}>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            opacity: opacityAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <FontAwesome name="heart" size={24} color="#ff4b4b" />
        <Text
          style={{ fontSize: 14, fontFamily: "Poppins-Bold", color: "#F9F9F9" }}
        >
          +1
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: 50,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
});
