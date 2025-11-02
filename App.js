import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { LivesProvider } from "./src/context/LivesContext";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import GetStarted from "./src/GetStarted";
import SelectCategory from "./src/SelectCategory";
import HtmlLevel from "./src/HtmlLevel";
import CssLevel from "./src/CssLevel";
import JavascriptLevel from "./src/JSLevel";
import PythonLevel from "./src/PythonLevel";
import PHPLevel from "./src/PHPLevel";
import NavigationHTML from "./src/navigation/NavigationHTML";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HtmlTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HtmlLevel" component={HtmlLevel} />
      <Tab.Screen name="HtmlProgress" component={HtmlProgressScreen} />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HTML" component={HtmlTabs} />
      <Drawer.Screen name="CSS" component={CssLevel} />
      <Drawer.Screen name="JavaScript" component={JavascriptLevel} />
      <Drawer.Screen name="Python" component={PythonLevel} />
      <Drawer.Screen name="PHP" component={PHPLevel} />
    </Drawer.Navigator>
  );
}

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
            <Stack.Screen name="HtmlLevel" component={HtmlLevel} />
            <Stack.Screen name="CssLevel" component={CssLevel} />
            <Stack.Screen name="JavascriptLevel" component={JavascriptLevel} />
            <Stack.Screen name="PythonLevel" component={PythonLevel} />
            <Stack.Screen name="PHPLevel" component={PHPLevel} />
            <Stack.Screen name="NavigationHTML" component={NavigationHTML} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar hidden={true} />
      </View>
    </LivesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
});
