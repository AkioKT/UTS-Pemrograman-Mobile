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

export default function PracticeOfTheDay() {
  const [practiceAnswer, setPracticeAnswer] = useState(null);
  const [practiceResult, setPracticeResult] = useState(null);
  const submitPractice = () => {
    const correct = practiceAnswer === practiceOfDayMock.answerIndex;
    setPracticeResult(correct ? "correct" : "wrong");
    if (correct) setXp((v) => v + 5);
    else {
      // maybe reduce life
      // loseLife(1) if you have context method
    }
  };
  const practiceOfDayMock = {
    id: "p1",
    question: "Apa output dari console.log(2 + '2')?",
    choices: ["4", "'22'", "TypeError", "NaN"],
    answerIndex: 1,
  };
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Practice of The Day</Text>
      <Text style={styles.cardSub}>{practiceOfDayMock.question}</Text>
      {practiceOfDayMock.choices.map((c, i) => (
        <TouchableOpacity
          key={i}
          style={[
            styles.choiceBtn,
            practiceAnswer === i && styles.choiceSelected,
          ]}
          onPress={() => setPracticeAnswer(i)}
        >
          <Text style={styles.choiceText}>{c}</Text>
        </TouchableOpacity>
      ))}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity style={styles.primaryBtn} onPress={submitPractice}>
          <Text style={styles.primaryBtnText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.ghostBtn}
          onPress={() => {
            setPracticeAnswer(null);
            setPracticeResult(null);
          }}
        >
          <Text style={styles.ghostBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>
      {practiceResult === "correct" && (
        <Text style={styles.correctText}>Benar! +5 XP</Text>
      )}
      {practiceResult === "wrong" && (
        <Text style={styles.wrongText}>Salah. Coba lagi.</Text>
      )}
    </View>
  );
}
