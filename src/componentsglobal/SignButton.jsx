import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function TabSwitcher({ isLogin, setIsLogin }) {
  const indicatorPos = useSharedValue(0);

  useEffect(() => {
    indicatorPos.value = withTiming(isLogin ? 0 : 1, { duration: 300 });
  }, [isLogin]);

  const animatedIndicator = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPos.value * 100 }],
  }));

  return (
    <View style={styles.tabContainer}>
      {/* Animated highlight */}
      <Animated.View style={[styles.indicator, animatedIndicator]} />

      {/* Tabs */}
      <TouchableOpacity
        onPress={() => setIsLogin(true)}
        style={styles.tab}
        activeOpacity={0.8}
      >
        <Text style={[styles.tabText, isLogin && styles.activeText]}>
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsLogin(false)}
        style={styles.tab}
        activeOpacity={0.8}
      >
        <Text style={[styles.tabText, !isLogin && styles.activeText]}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    position: "relative",
    backgroundColor: "#1e293b",
    borderRadius: 10,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    zIndex: 1,
  },
  tabText: {
    color: "#94a3b8",
    fontSize: 16,
  },
  activeText: {
    color: "#000",
    fontWeight: "700",
  },
  indicator: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#facc15",
    borderRadius: 10,
    zIndex: 0,
  },
});
