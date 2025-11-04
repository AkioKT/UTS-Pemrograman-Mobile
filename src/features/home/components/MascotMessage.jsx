import styles from "../../../style/HomeScreenStyle";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LivesContext } from "../../../context/LivesContext"; // sesuaikan path
// import untuk navigasi jika perlu
import { useNavigation } from "@react-navigation/native";

export default function MascotMessage() {
  return (
    <View style={[styles.card, styles.mascotCard]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <Image
          source={require("../../../assets/image/mascot.png")}
          style={{ width: 52, height: 52, borderRadius: 12, marginRight: 12 }}
        /> */}
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>Codey says</Text>
          <Text style={styles.cardSub}>
            Jangan lupa istirahat — 5 menit stretch setiap jam!
          </Text>
        </View>
      </View>
    </View>
  );
}
