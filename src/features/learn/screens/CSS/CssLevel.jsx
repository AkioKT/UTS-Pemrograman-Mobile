import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Svg, Polyline, Path } from "react-native-svg";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../../style/LevelStyle";

export default function CssLevel() {
  const [levels, setLevels] = useState([
    { id: 1, completed: false },
    { id: 2, completed: false },
    { id: 3, completed: false },
    { id: 4, completed: false },
    { id: 5, completed: false },
    { id: 6, completed: false },
    { id: 7, completed: false },
    { id: 8, completed: false },
    { id: 9, completed: false },
    { id: 10, completed: false },
  ]);
  useEffect(() => {
    const loadLevels = async () => {
      try {
        const storedLevels = await AsyncStorage.getItem("levels");
        if (storedLevels) {
          setLevels(JSON.parse(storedLevels));
        }
      } catch (error) {
        console.log("Error loading levels:", error);
      }
    };
    loadLevels();
  }, []);

  // 🔹 Simpan data ke AsyncStorage
  const saveLevels = async (newLevels) => {
    try {
      await AsyncStorage.setItem("levels", JSON.stringify(newLevels));
    } catch (error) {
      console.log("Error saving levels:", error);
    }
  };

  // 🔹 Fungsi menandai level selesai
  const completeLevel = (levelId) => {
    const newLevels = levels.map((level) =>
      level.id === levelId ? { ...level, completed: true } : level
    );
    setLevels(newLevels);
    saveLevels(newLevels); // simpan ke AsyncStorage
  };

  const navigation = useNavigation(); // ⬅️ Ambil objek navigation tanpa props
  const backPage = () => {
    navigation.navigate("SelectCategory");
  };

  // const [activeTab, setActiveTab] = useState("HTML");

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../../../../assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // atau tampilkan splash/loading
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {/* Unit Header */}
      <View style={styles.unitHeader}>
        <View>
          <TouchableOpacity>
            <Ionicons
              name="chevron-back"
              size={28}
              color="#fff"
              onPress={backPage}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.unitTitle}>CSS</Text>
          <Text style={styles.unitSubtitle}>Ask for directions</Text>
        </View>
        <View style={styles.guideButton}>
          <View style={styles.guideIcon}>
            <View style={styles.guideGrid}>
              <View style={styles.guideRow}>
                <View style={styles.guideDot} />
                <View style={styles.guideDot} />
              </View>
              <View style={styles.guideRow}>
                <View style={styles.guideDot} />
                <View style={styles.guideDot} />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Progress Path */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.progressPath}
      >
        {/* Completed Level */}
        <View style={styles.levelContainer}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={styles.levelBox}
              onPress={() => completeLevel(level.id)}
            >
              {level.completed ? (
                <Svg width="40" height="40" viewBox="0 0 24 24">
                  <Polyline
                    points="20 6 9 17 4 12"
                    stroke="#B8860B"
                    strokeWidth="3"
                    fill="none"
                  />
                </Svg>
              ) : (
                <Text style={styles.levelText}>{level.id}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <View style={styles.homeIcon}>
            <View style={styles.homeIconInner} />
          </View>
        </View>

        <View style={[styles.navItem, styles.navItemInactive]}>
          <Text style={styles.navEmoji}>🎧</Text>
        </View>

        <View style={[styles.navItem, styles.navItemInactive]}>
          <Text style={styles.navEmoji}>💪</Text>
        </View>

        <View style={[styles.navItem, styles.navItemInactive]}>
          <Text style={styles.navEmoji}>🏆</Text>
        </View>

        <View style={[styles.navItem, styles.navItemInactive]}>
          <Text style={styles.navEmoji}>🛡️</Text>
          <View style={styles.notificationDot} />
        </View>

        <View style={[styles.navItem, styles.navItemInactive]}>
          <View style={styles.menuDots}>
            <View style={styles.menuDot} />
            <View style={styles.menuDot} />
            <View style={styles.menuDot} />
          </View>
        </View>
      </View>
    </View>
  );
}
