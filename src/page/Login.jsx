import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../style/LoginStyle";

export default function Login({ navigation }) {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const listAccount = [
    { id: 1, username: "bahlil", password: "botak" },
    { id: 2, username: "", password: "" },
  ];

  const handleLogin = () => {
    // Cek apakah ada akun dengan email & password yang cocok
    const foundUser = listAccount.find(
      (user) =>
        user.username === loginUsername && user.password === loginPassword
    );

    if (foundUser) {
      Alert.alert("Login Berhasil", `Selamat datang, ${foundUser.username}!`);
      navigation.navigate("SelectCategory");
      console.log("User:", foundUser);
    } else {
      Alert.alert("Login Gagal", "Email atau password salah!");
    }
  };

  return (
    <View style={styles.formCard}>
      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>📧</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
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
          <Text style={styles.inputIcon}>🔒</Text>
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
              {showLoginPassword ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        </View>
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
