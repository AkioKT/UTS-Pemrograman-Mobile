import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import semua level HTML
import Q1 from "../ListLevelHTML/Q1";
import Q2 from "../ListLevelHTML/Q2";
import Q3 from "../ListLevelHTML/Q3";
import Q4 from "../ListLevelHTML/Q4";

const Stack = createNativeStackNavigator();

export default function NavigationHTML() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Q1" component={Q1} />
      <Stack.Screen name="Q2" component={Q2} />
      <Stack.Screen name="Q3" component={Q3} />
      <Stack.Screen name="Q4" component={Q4} />
    </Stack.Navigator>
  );
}
