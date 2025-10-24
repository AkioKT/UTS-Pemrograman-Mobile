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

export default function HtmlLevel() {
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
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
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
          <Text style={styles.unitTitle}>HTML</Text>
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#020617",
  },
  header: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  time: {
    fontSize: 18,
    fontWeight: "600",
  },
  statusInfo: {
    fontSize: 14,
    fontWeight: "500",
  },
  headerStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakBadge: {
    backgroundColor: "#f87171",
    borderRadius: 8,
    width: 48,
    height: 32,
    borderBottomWidth: 2,
    borderBottomColor: "#dc2626",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  emoji: {
    fontSize: 30,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ea580c",
  },
  gemIcon: {
    width: 28,
    height: 28,
    backgroundColor: "#60a5fa",
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#3b82f6",
  },
  plusButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
  },
  plusText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  unitHeader: {
    backgroundColor: "#020617",
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unitBack: {
    color: "white",
    fontSize: 4,
  },
  unitTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
  },
  unitSubtitle: {
    color: "white",
    fontSize: 16,
  },
  guideButton: {
    backgroundColor: "#d8b4fe",
    borderRadius: 16,
    padding: 12,
  },
  guideIcon: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  guideGrid: {
    flexDirection: "column",
    gap: 2,
  },
  guideRow: {
    flexDirection: "row",
    gap: 2,
  },
  guideDot: {
    width: 6,
    height: 6,
    backgroundColor: "white",
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  progressPath: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  levelContainer: {
    width: "100%",
    gap: 8,
    // marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  levelLeft: {
    alignSelf: "flex-start",
    marginLeft: 16,
  },
  levelRight: {
    alignSelf: "flex-end",
    marginRight: 32,
  },
  levelBox: {
    width: "40%", // ± 4 item per baris (100 / 4 = 25%), dikurangi gap
    aspectRatio: 1,
    height: 70,
    backgroundColor: "#fde047",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#ca8a04",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  levelText: {
    fontSize: 30,
    fontFamily: "Poppins-Regular",
    fontWeight: 900,
  },
  chestLevel: {
    width: 80,
    height: 80,
    backgroundColor: "#fbbf24",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#b45309",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    position: "relative",
  },
  chestTop: {
    width: 56,
    height: 12,
    backgroundColor: "#d97706",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "absolute",
    top: 8,
  },
  chestBody: {
    width: 40,
    height: 40,
    backgroundColor: "#b45309",
    borderRadius: 4,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  chestLock: {
    width: 12,
    height: 16,
    backgroundColor: "#78350f",
    borderRadius: 2,
  },
  bottomNav: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#020617",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: "center",
    position: "relative",
  },
  navItemInactive: {
    opacity: 0.6,
  },
  homeIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  homeIconInner: {
    width: 24,
    height: 20,
    backgroundColor: "#fb923c",
    borderRadius: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#f97316",
  },
  navEmoji: {
    fontSize: 30,
  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
  },
  menuDots: {
    flexDirection: "column",
    gap: 4,
    alignItems: "center",
  },
  menuDot: {
    width: 4,
    height: 4,
    backgroundColor: "#c084fc",
    borderRadius: 2,
  },
});
