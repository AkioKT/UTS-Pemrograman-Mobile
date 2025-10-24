import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "./src/GetStarted";
import SelectCategory from "./src/SelectCategory";
import HtmlLevel from "./src/HtmlLevel";
import CssLevel from "./src/CssLevel";
import JavascriptLevel from "./src/JSLevel";
import PythonLevel from "./src/PythonLevel";
import PHPLevel from "./src/PHPLevel";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
});
