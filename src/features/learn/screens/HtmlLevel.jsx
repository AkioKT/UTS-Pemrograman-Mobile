import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Svg, Polyline, Path } from "react-native-svg";
import { useFonts } from "expo-font";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";
import styles from "../../../style/AllCategoryStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LivesContext } from "../../../context/LivesContext";
import { useContext } from "react";
import { ProgressContext } from "../../../context/ProgressOverview";
import LifeTimer from "../../../componentsglobal/LifeTimer";
import BackgroundHTML from "../../../../assets/image/thumbnail_html.png";

export default function HtmlLevel() {
  const { updateProgress } = useContext(ProgressContext);
  const navigation = useNavigation(); // ⬅️ Ambil objek navigation tanpa props
  const [levels, setLevels] = useState([
    { id: 1, completed: false, locked: false }, // level 1 terbuka
    { id: 2, completed: false, locked: true },
    { id: 3, completed: false, locked: true },
    { id: 4, completed: false, locked: true },
    { id: 5, completed: false, locked: true },
    // { id: 6, completed: false, locked: true },
    // { id: 7, completed: false, locked: true },
    // { id: 8, completed: false, locked: true },
    // { id: 9, completed: false, locked: true },
    // { id: 10, completed: false, locked: true },
  ]);
  const { lives } = useContext(LivesContext);
  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

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
    const newLevels = levels.map((level) => {
      if (level.id === levelId) return { ...level, completed: true };
      if (level.id === levelId + 1) return { ...level, locked: false };
      return level;
    });

    setLevels(newLevels);
    saveLevels(newLevels);

    // ✅ Hitung Progress HTML
    const completedCount = newLevels.filter((l) => l.completed).length;
    const total = newLevels.length;
    const percent = completedCount / total;

    updateProgress("HTML", percent);
  };

  const handleLevelPress = (levelId) => {
    const level = levels.find((l) => l.id === levelId);

    if (level.locked) {
      alert("Selesaikan level sebelumnya dulu!");
      return;
    }

    navigation.navigate("NavigationHTML", {
      screen: "LearningHTML",
      params: {
        levelId,
        onFinish: () => completeLevel(levelId),
      },
    });
  };

  const backPage = () => {
    navigation.navigate("MainTabs", {
      screen: "Learn",
    });
  };

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../../../assets/fonts/Poppins-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null; // atau tampilkan splash/loading
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={BackgroundHTML}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.2,
          
        }}
      />
      {/* Unit Header */}
      <View style={styles.unitHeader}>
        <View style={styles.unitSubHeader}>
          <TouchableOpacity>
            <Ionicons
              name="chevron-back"
              size={28}
              color="#fff"
              onPress={backPage}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.unitTitle}>HTML</Text>
          </View>
        </View>
        <View style={styles.livesContainer}>
          <LifeTimer />
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
            <Pressable
              key={level.id}
              onPress={() => handleLevelPress(level.id)}
              style={({ pressed }) => [
                styles.levelBox,
                pressed && styles.levelPressed, // efek aktif
              ]}
            >
              {level.locked ? (
                <Ionicons name="lock-closed" size={24} color="#171717" />
              ) : level.completed ? (
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
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
