import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../../src/features/home/screens/HomeScreen";
import LearnScreen from "../../src/features/learn/screens/SelectCategory";
import PracticeScreen from "../../src/features/practice/screens/PracticeScreen";
import ProfileScreen from "../../src/features/profile/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function NavbarButtom() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000410",
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#777",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Learn") {
            iconName = focused ? "code-slash" : "code-slash-outline";
          } else if (route.name === "Practice") {
            iconName = focused ? "terminal" : "terminal-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
