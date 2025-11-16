import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import styles from "../style/LoginStyle";
import listAccounts from "../../assets/data/accounts/acc.json";
import Toast from "react-native-toast-message";

export default function Login({ navigation }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleLogin = () => {
    // Cek apakah ada akun dengan email & password yang cocok
    const foundUser = listAccounts.find(
      (user) =>
        user.username === loginUsername && user.password === loginPassword
    );

    if (foundUser) {
      setIsValid(false); // reset error
      navigation.navigate("MainTabs", {
        screen: "Home",
      });

      console.log("User:", foundUser);
    } else {
      setIsValid(true); // tampilkan error
    }
  };

  return (
    <View style={styles.formCard}>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={22} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Example@gmail.com"
            placeholderTextColor="#9CA3AF"
            value={loginUsername}
            onChangeText={setLoginUsername}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={22} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry={!showLoginPassword}
            autoCapitalize="none"
            autoComplete="password"
          />
          <TouchableOpacity
            onPress={() => setShowLoginPassword(!showLoginPassword)}
            style={styles.eyeButton}
          >
            <Text style={styles.eyeIcon}>
              {showLoginPassword ? (
                <Ionicons name="eye" size={24} style={styles.inputIcon} />
              ) : (
                <Ionicons name="eye-off" size={24} style={styles.inputIcon} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {isValid && (
          <View>
            <Text style={{ color: "#ff3030ff" }}>
              Email atau Password salah!
            </Text>
          </View>
        )}
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.8}
        style={styles.buttonWrapper}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
