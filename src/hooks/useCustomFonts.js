import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";

let splashPreventCalled = false;

export default function useCustomFonts() {
  if (!splashPreventCalled) {
    SplashScreen.preventAutoHideAsync();
    splashPreventCalled = true;
  }

  const [fontsLoaded] = useFonts({
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    }
  }, [fontsLoaded]);

  return fontsLoaded;
}