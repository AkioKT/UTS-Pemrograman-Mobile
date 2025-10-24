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

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Login from "../src/page/Login";
import SignUp from "../src/page/SignUp";
import styles from "./style/LoginStyle";
// "#581C87", "#3730A3", "#1E3A8A"
export default function GetStarted({navigation}) {
  const [isLogin, setIsLogin] = useState(true);

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
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setIsLogin(true)}
              activeOpacity={0.8}
              style={[styles.tab, isLogin && styles.tabActive]}
            >
              <Text style={[styles.tabText, isLogin && styles.tabTextActive]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsLogin(false)}
              activeOpacity={0.8}
              style={[styles.tab, !isLogin && styles.tabActive]}
            >
              <Text style={[styles.tabText, !isLogin && styles.tabTextActive]}>
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
            <Login navigation={navigation}/>
          ) : (
            /* SIGN UP FORM */
            <SignUp navigation={navigation}/>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
