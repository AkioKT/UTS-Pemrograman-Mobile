import { useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useCustomFonts from "../../../hooks/useCustomFonts";
import MascotImage from "../../../../assets/image/MascotSad.png";

export default function AlertLife() {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const goBack = () => navigation.goBack();
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.subContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.textHeader}>
          <Text
            style={{
              fontFamily: "Poppins-Bold",
              fontSize: 24,
              color: "#f9f9f9",
            }}
          >
            Game Over!
          </Text>
        </View>
        <View style={styles.alert}>
          <Image source={MascotImage} style={{ width: 250, height: 250 }} />
          {/* <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
              color: "#f9f9f9",
            }}
          >
            Nyawa kamu habis!. Tidak bisa menjawab lagi
          </Text> */}
          <TouchableOpacity onPress={goBack} style={styles.btnBack}>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 18,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f956",
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    backgroundColor: "#000410",
    width: 300,
    borderRadius: 6,
    padding: 10,
  },
  textHeader: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  alert: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btnBack: {
    paddingVertical: 6,
    // paddingHorizontal: 90,
    width: "100%",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});
