import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LearningHTML from "../features/learn/screens/HTML/LearningScreen";

const Stack = createNativeStackNavigator();

export default function NavigationHTML() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LearningHTML" component={LearningHTML} />
    </Stack.Navigator>
  );
}
