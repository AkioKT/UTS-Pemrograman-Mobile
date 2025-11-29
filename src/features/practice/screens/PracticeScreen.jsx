import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCustomFonts from "../../../hooks/useCustomFonts";
import ButtonClick from "../../../sounds/ButtonClick";
const { width } = Dimensions.get("window");
const character = {
  1: require("../../../../assets/image/chibi-male-1.png"),
  2: require("../../../../assets/image/chibi-male-2.png"),
  3: require("../../../../assets/image/chibi-female-1.png"),
  4: require("../../../../assets/image/chibi-female-2.png"),
};
const characterArray = Object.values(character);
export default function PracticeScreen({ navigation }) {
  const [selectedMode, setSelectedMode] = useState("syntax");
  const [selected, setSelected] = useState(characterArray[0]);
  const battleModes = [
    {
      id: "syntax",
      title: "Syntax Clash 1v1",
      description: "Find the error before your opponent.",
      xp: "50",
      badge: "Syntax Samurai",
      icon: "</>",
    },
    {
      id: "debug",
      title: "Debug Frenzy",
      description: "Fix bugs as fast as you can.",
      xp: "75",
      badge: "Bug Hunter",
      icon: "{}",
    },
  ];

  const goToBattleLobby = async () => {
    const avatarKey = Object.keys(character).find(
      (key) => character[key] === selected
    );

    const user = {
      id: "user-" + Math.floor(Math.random() * 10000),
      name: "Player1", // bisa diganti sesuai login
      avatar: avatarKey,
    };
    ButtonClick();
    navigation.navigate("BattleLobby", { user });
  };

  const selectAvatar = async (itemKey) => {
    const keyNum = Number(itemKey);
    setSelected(character[keyNum]);
    await AsyncStorage.setItem("fullAvatar", String(keyNum));
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Coding Battle</Text>
        </View>

        {/* Battle Mode Selection */}
        <View style={styles.modeSection}>
          <Text style={styles.sectionTitle}>Select Battle Mode</Text>

          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {battleModes.map((mode) => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.modeCard,
                    selectedMode === mode.id && styles.modeCardSelected,
                  ]}
                  onPress={() => setSelectedMode(mode.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.modeIcon}>
                    <Text style={styles.modeIconText}>{mode.icon}</Text>
                  </View>
                  <Text style={styles.modeTitle}>{mode.title}</Text>
                  <Text style={styles.modeDescription}>{mode.description}</Text>
                  <View style={styles.modeRewards}>
                    <Text style={styles.rewardText}>XP: {mode.xp}</Text>
                    <Text style={styles.badgeText}>Badge: {mode.badge}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{fontFamily: "Pixel-Bold", fontSize: 24, color: "#fff"}}>- - - Coming Soon - - -</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: "#ffd54f",
          marginTop: 20,
          padding: 14,
          borderRadius: 6,
        }}
        onPress={goToBattleLobby}
      >
        <Text
          style={{
            color: "#171717",
            fontSize: 18,
            textAlign: "center",
            fontFamily: "Pixel-Bold",
          }}
        >
          Start Coding Battle
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: "Pixel-Bold",
    color: "#ffffff",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4fc3f7",
  },
  playerCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#141b3a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1e2749",
  },
  playerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  playerLevel: {
    fontSize: 14,
    color: "#8e9bb5",
  },
  xpText: {
    fontSize: 14,
    color: "#8e9bb5",
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#1e2749",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#ffd54f",
    borderRadius: 4,
  },
  arenaContainer: {
    marginHorizontal: 20,
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  avatarWrapper: {
    flex: 1,
    position: "relative",
  },
  avatarLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  gridOverlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridLine: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(79, 195, 247, 0.1)",
  },
  modeSection: {
    // marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Pixel-Bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  modeScroll: {
    // paddingHorizontal: 20,
    backgroundColor: "red",
    // gap: 12,
  },
  modeCard: {
    width: width * 0.55,
    padding: 20,
    // height: "100%",
    backgroundColor: "#141b3a",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#1e2749",
    marginRight: 12,
  },
  modeCardSelected: {
    borderColor: "#ffd54f",
    backgroundColor: "#1a2447",
  },
  modeIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#1e2749",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  modeIconText: {
    fontSize: 24,
    color: "#4fc3f7",
  },
  modeTitle: {
    fontSize: 16,
    fontFamily: "Pixel-Bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  modeDescription: {
    fontSize: 13,
    color: "#8e9bb5",
    marginBottom: 12,
    lineHeight: 18,
    fontFamily: "Pixel-Bold",
  },
  modeRewards: {
    gap: 4,
  },
  rewardText: {
    fontSize: 12,
    color: "#ffd54f",
    fontFamily: "Pixel-Bold",
  },
  badgeText: {
    fontSize: 12,
    color: "#8e9bb5",
    fontFamily: "Pixel-Bold",
  },
  LabelActive: {
    color: "#ffd54f",
    fontWeight: "600",
  },
  // AVATAR STYLE
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "left",
    marginTop: 20,
    fontFamily: "Pixel-Bold",
  },
  previewContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  preview: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  avatarRow: {
    gap: 16,
  },
  avatarOption: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 12,
    backgroundColor: "#1e2749",
  },
  saveBtn: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: "#1e90ff",
    borderRadius: 10,
  },
  setSelected: {
    borderWidth: 1,
    borderColor: "#ffd54f",
  },
});
