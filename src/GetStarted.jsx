/**
 * CodeDex Auth Screen - React Native
 *
 * Installation required:
 * npx expo install expo-linear-gradient
 *
 * For React Native CLI (non-Expo):
 * npm install react-native-linear-gradient
 * cd ios && pod install
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Login from "../src/page/Login";
import SignUp from "../src/page/SignUp";
import styles from "./style/LoginStyle";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
export default function GetStarted({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const highlightPos = useSharedValue(0);
  const [tabWidth, setTabWidth] = useState(0);

  useEffect(() => {
    highlightPos.value = withTiming(isLogin ? 0 : 1, { duration: 200 });
  }, [isLogin]);

  const highlightAnim = useAnimatedStyle(() => ({
    transform: [{ translateX: highlightPos.value * tabWidth }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Toggle Tabs */}
          <View
            style={styles.tabContainer}
            onLayout={(e) => setTabWidth(e.nativeEvent.layout.width / 2)}
          >
            <Animated.View style={[styles.slider, highlightAnim]} />

            <TouchableOpacity
              onPress={() => setIsLogin(true)}
              activeOpacity={0.8}
              style={styles.tab}
            >
              <Text style={[styles.tabText, isLogin && styles.activeText]}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsLogin(false)}
              activeOpacity={0.8}
              style={styles.tab}
            >
              <Text style={[styles.tabText, !isLogin && styles.activeText]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={styles.header}>
            {/* <Text style={styles.emoji}>{isLogin ? "👋" : "🎉"}</Text> */}
            <Text style={styles.title}>
              {isLogin ? "Welcome Back!" : "Join CodeCrack"}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin
                ? "Sign in to continue your coding journey"
                : "Start your coding adventure today!"}
            </Text>
          </View>

          {/* LOGIN FORM */}
          {isLogin ? (
            <Login navigation={navigation} />
          ) : (
            /* SIGN UP FORM */
            <SignUp navigation={navigation} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
