// BattleRoom.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { initSocket, getSocket } from "./socket";
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

const { width } = Dimensions.get("window");
export default function BattleRoom({ navigation, route }) {
  const { roomId, user } = route.params;
  const [room, setRoom] = useState(null);
  const socket = getSocket() || initSocket();
  const startBattle = () => {
    if (!room || !socket) return;

    if (socket.id !== room.host) {
      return alert("Hanya host yang bisa memulai battle!");
    }

    socket.emit("start_battle", { roomId });
  };

  const backPage = () => {
    const socket = getSocket();

    // HOST
    if (socket && room && socket.id === room.host) {
      socket.emit("leave_room", { roomId });
      navigation.navigate("BattleLobby");
      return;
    }
    // PLAYER biasa
    if (socket) {
      socket.emit("leave_room", { roomId });
      navigation.navigate("BattleLobby");
    }
  };

  useEffect(() => {
    socket.on("room_update", (summary) => {
      if (!summary) return;
      summary.players = summary.players.map((p) => ({
        ...p,
        avatar: Number(p.avatar) || 1, // fallback default
      }));
      setRoom(summary);
    });

    socket.on("battle_starting", ({ startTime }) => {
      navigation.navigate("BattleScreen", { roomId, user, startTime });
    });
    // 🔥 penting: semua player keluar jika host menutup room
    socket.on("room_closed", () => {
      navigation.goBack();
    });
    // request update
    socket.emit("join_room", { roomId, user });
    socket.emit("get_room");

    return () => {
      socket.off("room_update");
      socket.off("battle_starting");
      socket.off("room_closed"); // ✨ bersihkan listener
    };
  }, []);

  return (
    <View style={s.container}>
      <Text style={[s.title, {fontSize: 30}]}>Coding Battle</Text>
      <Text style={s.title}>Room: {roomId}</Text>

      <FlatList
        data={room?.players ?? []}
        keyExtractor={(p) => p.id || p.socketId}
        horizontal
        contentContainerStyle={{
          width: "100%",
          justifyContent: "center",
          // backgroundColor: "red"
          // alignItems: "center",
        }}
        renderItem={({ item }) => (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{ color: "#fff", fontFamily: "Pixel-Bold", fontSize: 16 }}
            >
              {item.name}
            </Text>
            <Image
              source={character[item.avatar]}
              style={{ width: 180, height: 180 }}
              resizeMode="contain"
            />

            <Text
              style={{ color: "#fff", fontFamily: "Pixel-Bold", fontSize: 20 }}
            >
              (score: {item.score || 0})
            </Text>
          </View>
        )}
      />

      <View style={s.btnWrap}>
        <TouchableOpacity style={s.btn} onPress={startBattle}>
          <Text style={s.btntxt}>Start Battle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btnBack} onPress={backPage}>
          <Text style={s.btntxt}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // blue-gray dark
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontFamily: "Pixel-Bold",
    color: "#fff",
    textAlign: "center",
    // marginBottom: 20,
  },

  playersLabel: {
    color: "#CBD5E1",
    fontSize: 16,
    marginBottom: 10,
  },

  playerCard: {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  playerText: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "600",
  },

  btnWrap: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    flex: 1,
    backgroundColor: "#ffd54f",
    padding: 10,
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#3B82F6",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  btnBack: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1ececff",
    borderRadius: 6,
    elevation: 3,
    shadowColor: "#3B82F6",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  btntxt: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Pixel-Bold",
  },
});
