import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Alert,
  StyleSheet,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { initSocket, getSocket } from "./socket";
import { Ionicons } from "@expo/vector-icons";
import useCustomFonts from "../../src/hooks/useCustomFonts";
import SelectCharacter from "../sounds/SelectCharacter";
import ButtonClick from "../sounds/ButtonClick";
const { width } = Dimensions.get("window");
const character = {
  1: require("../../assets/image/chibi-male-1.png"),
  2: require("../../assets/image/chibi-male-2.png"),
  3: require("../../assets/image/chibi-female-1.png"),
  4: require("../../assets/image/chibi-female-2.png"),
  5: require("../../assets/image/chibi-female-3.png"),
  6: require("../../assets/image/chibi-female-4.png"),
  7: require("../../assets/image/chibi-male-3.png"),
  8: require("../../assets/image/chibi-male-4.png"),
};

export default function BattleLobby({ navigation, route }) {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const joinAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.8)).current;

  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;

  const backPage = () => {
    navigation.navigate("MainTabs", {
      screen: "Practice",
    });
    ButtonClick();
  };
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15, // naik 10px
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0, // turun kembali
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  const animateJoin = () => {
    Animated.sequence([
      Animated.timing(joinAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(joinAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const chooseAvatar = (key) => {
    setSelectedAvatar(key); // key = 1,2,3,4
    SelectCharacter();
  };

  // BattleLobby.js
  const createRoom = () => {
    if (!name.trim()) return Alert.alert("Nama wajib diisi!");
    if (!selectedAvatar) return Alert.alert("Pilih avatar dulu!");

    setJoined(true);
    animateJoin();

    let socket = getSocket();
    if (!socket) socket = initSocket();

    const id = roomId || Math.floor(1000 + Math.random() * 9000).toString();

    socket.emit("create_room", {
      roomId: id,
      user: { id: socket.id, name, avatar: selectedAvatar },
    });

    console.log("Emit create_room:", id, selectedAvatar);
    ButtonClick();
    // Jangan navigasi di sini
  };

  // Socket listener
  useEffect(() => {
    const socket = initSocket();

    socket.on("room_created", ({ roomId, user }) => {
      console.log("Room created:", roomId, user);
      // navigasi hanya setelah server konfirmasi
      navigation.navigate("BattleRoom", { roomId, user });
    });

    socket.on("room_update", (summary) => {
      const socket = getSocket();
      const currentUser = summary.players.find((p) => p.id === socket.id);
      if (!currentUser) return; // aman jika belum ada
      navigation.navigate("BattleRoom", {
        roomId: summary.roomId,
        user: currentUser,
      });
    });
    socket.on("error_msg", (msg) => {
      Alert.alert("Error", msg);
      setJoined(false); // reset UI
    });

    return () => {
      socket.off("room_created");
      socket.off("room_update");
      socket.off("error_msg");
    };
  }, []);

  const joinRoom = () => {
    if (!roomId.trim()) return Alert.alert("Masukkan Room ID");
    if (!selectedAvatar) return Alert.alert("Pilih avatar dulu!");

    setJoined(true);
    animateJoin();

    let socket = getSocket();
    if (!socket) {
      socket = initSocket();
    }

    // Kirim join_room ke server dengan avatar
    socket.emit("join_room", {
      roomId,
      user: {
        id: socket.id,
        name: name,
        avatar: selectedAvatar,
      },
    });

    console.log("Emit join_room:", roomId, selectedAvatar);
    ButtonClick();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0a0e27", padding: 16 }}>
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={backPage}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#fff",
            fontSize: 24,
            marginLeft: 16,
            fontFamily: "Pixel-Bold",
          }}
        >
          Battle Lobby
        </Text>
      </View>

      {/* Avatar Preview */}
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 20,
            position: "relative",
          }}
        >
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor="#9CA3AF"
            style={{
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              fontFamily: "Pixel-Bold",
              padding: 16,
              borderRadius: 6,
              color: "#fff",
              marginBottom: 16,
            }}
          />
          <TextInput
            value={roomId}
            onChangeText={setRoomId}
            placeholder="Room ID (leave blank to create)"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            style={{
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              padding: 16,
              fontFamily: "Pixel-Bold",
              borderRadius: 6,
              color: "#fff",
              marginBottom: 16,
            }}
          />
          {selectedAvatar ? (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {/* Glow */}
              <Animated.View
                style={{
                  position: "absolute",
                  width: 150,
                  height: 150,
                  borderRadius: 140,
                  backgroundColor: "#ffffff", // warna glow
                  opacity: glowAnim,
                  filter: "blur(40px)", // expo web akan bekerja, native ignore (diganti shadow native)
                  shadowColor: "#f6be07ff",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.9,
                  shadowRadius: 40,
                  elevation: 30, // Android glow
                  transform: [{ translateY: floatAnim }],
                }}
              />

              {/* Avatar */}
              <Animated.Image
                source={character[selectedAvatar]}
                style={{
                  width: 250,
                  height: 250,
                  borderRadius: 10,
                  transform: [{ scale: joinAnim }, { translateY: floatAnim }],
                }}
              />
            </View>
          ) : (
            <View
              style={{
                width: 250,
                height: 250,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "Pixel-Bold",
                  fontSize: 26,
                }}
              >
                Pilih Avatar Anda
              </Text>
            </View>
          )}
        </View>

        {/* Avatar Selection */}
        <View style={{ gap: 10 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 4 }}
          >
            {Object.keys(character).map((key) => (
              <TouchableOpacity
                key={key}
                onPress={() => chooseAvatar(Number(key))} // jarak antar avatar
              >
                <Image
                  source={character[key]}
                  style={{
                    width: 40,
                    height: 200,
                    borderRadius: 4,
                    // backgroundColor: "green",
                    opacity: selectedAvatar === Number(key) ? 1 : 0.5,
                    borderWidth: selectedAvatar === Number(key) ? 2 : 0,
                    borderColor: "#ffd54f",
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={createRoom}
              style={{
                flex: 1,
                backgroundColor: "#ffd54f",
                padding: 14,
                borderRadius: 6,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  color: "#171717",
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "Pixel-Bold",
                }}
              >
                Create Room
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={joinRoom}
              style={{
                flex: 1,
                backgroundColor: "#171717",
                borderWidth: 1,
                borderColor: "#ffd54f",
                padding: 14,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: "#ffd54f",
                  fontSize: 16,
                  textAlign: "center",
                  fontFamily: "Pixel-Bold",
                }}
              >
                Join Room
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
    padding: 20,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 28,
    color: "white",
    marginVertical: 20,
    fontFamily: "Pixel-Bold",
  },
  vsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 250,
    height: 250,
    marginHorizontal: 20,
  },
  vsText: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "700",
  },
  input: {
    width: "90%",
    backgroundColor: "#162044",
    color: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 14,
    fontFamily: "Pixel-Bold",
    fontSize: 16,
  },
  btnWrapper: {
    width: "90%",
    flexDirection: "row",
    gap: 6,
  },
  btn: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffd54f",
    borderRadius: 6,
  },
  btnSecondary: {
    flex: 1,
    padding: 10,
    backgroundColor: "#4d4d4d",
    borderRadius: 6,
  },
  btntxt: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Pixel-Bold",
    color: "#000",
  },
  btntxtSecondary: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Pixel-Bold",
    color: "#fff",
  },
});
