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

export default function CodingTips() {
  const tipsMock = [
    "Gunakan === daripada == di JavaScript untuk menghindari type coercion.",
    "Sematkan alt pada tag <img> untuk aksesibilitas.",
    "Gunakan semantic tags (<header>, <main>, <footer>) untuk struktur yang jelas.",
  ];
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Coding Tip of The Day</Text>
      <Text style={styles.cardSub}>{tipsMock[0]}</Text>
    </View>
  );
}
