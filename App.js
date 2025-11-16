import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { LivesProvider } from "./src/context/LivesContext";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import GetStarted from "./src/GetStarted";
import SelectCategory from "./src/features/learn/screens/SelectCategory";
import HtmlLevel from "./src/features/learn/screens/HtmlLevel";
import CssLevel from "./src/features/learn/screens/CssLevel";
import JavascriptLevel from "./src/features/learn/screens/JSLevel";
import PythonLevel from "./src/features/learn/screens/PythonLevel";
import PHPLevel from "./src/features/learn/screens/PHPLevel";
import NavigationHTML from "./src/navigation/NavigationHTML";
import NavbarButtom from "./src/componentsglobal/NavbarBottom";
import HomeScreen from "./src/features/home/screens/HomeScreen";
import LearningScreenHTML from "./src/features/learn/screens/LearningScreenHTML";
import { ProgressProvider } from "./src/context/ProgressOverview";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden"); // sembunyikan bar bawah
    NavigationBar.setBehaviorAsync("overlay-swipe"); // tetap bisa swipe untuk munculkan
  }, []);
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
  });
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "Poppins" };
  return (
    <LivesProvider>
      <ProgressProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="GetStarted"
              screenOptions={{
                headerShown: false, // biar tampilan lebih bersih
              }}
            >
              <Stack.Screen name="GetStarted" component={GetStarted} />
              <Stack.Screen name="SelectCategory" component={SelectCategory} />
              <Stack.Screen name="MainTabs" component={NavbarButtom} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="HtmlLevel" component={HtmlLevel} />
              <Stack.Screen name="CssLevel" component={CssLevel} />
              <Stack.Screen
                name="JavascriptLevel"
                component={JavascriptLevel}
              />
              <Stack.Screen name="PythonLevel" component={PythonLevel} />
              <Stack.Screen name="PHPLevel" component={PHPLevel} />
              <Stack.Screen name="NavigationHTML" component={NavigationHTML} />
              <Stack.Screen name="LearningScreen" component={LearningScreenHTML} />
            </Stack.Navigator>
          </NavigationContainer>
          <StatusBar hidden={true} />
        </View>
      </ProgressProvider>
    </LivesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
});
