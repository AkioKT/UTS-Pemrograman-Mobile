import styles from "./styles/PracticeOfTheDay";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import WaveBackground from "../hooks/WaveBackground";
import useCustomFonts from "../../../hooks/useCustomFonts";

export default function PracticeOfTheDay() {
  const [practiceAnswer, setPracticeAnswer] = useState(null);
  const [practiceResult, setPracticeResult] = useState(null);
  const submitPractice = () => {
    const correct = practiceAnswer === practiceOfDayMock.answerIndex;
    setPracticeResult(correct ? "correct" : "wrong");
    if (correct) setXp((v) => v + 5);
  };
  const practiceOfDayMock = {
    id: "p1",
    question: "Apa output dari console.log(2 + '2')?",
    choices: ["4", "'22'", "TypeError", "NaN"],
    answerIndex: 1,
  };
  const fontsLoaded = useCustomFonts();
  if (!fontsLoaded) return null;
  return (
    <View style={styles.card}>
      <WaveBackground
        height={330}
        waveHeight="60%"
        waveOpacity={{ w1: 0.5, w2: 0.25, w3: 0.18 }}
      />
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.sectionTitle}>Practice of The Day</Text>
        <Text style={styles.cardSub}>{practiceOfDayMock.question}</Text>
        {practiceOfDayMock.choices.map((c, i) => {
          const isCorrect = i === practiceOfDayMock.answerIndex;
          const isSelected = practiceAnswer === i;
          const locked = practiceResult === "wrong";

          return (
            <TouchableOpacity
              key={i}
              disabled={locked}
              style={[
                styles.choiceBtn,
                isSelected && styles.choiceSelected,
                locked && isCorrect && { backgroundColor: "#19A974" }, // hijau
                locked &&
                  isSelected &&
                  !isCorrect && { backgroundColor: "#B00020" }, // merah jika jawaban user salah
              ]}
              onPress={() => !locked && setPracticeAnswer(i)} // cegah memilih ulang
            >
              <Text style={styles.choiceText}>{c}</Text>
            </TouchableOpacity>
          );
        })}

        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              practiceResult === "wrong" && { backgroundColor: "#777" },
            ]}
            disabled={practiceResult === "wrong"} // sudah salah → tidak bisa submit lagi
            onPress={submitPractice}
          >
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
      </View>
    </View>
  );
}

// {practiceResult === "correct" && (
//           <Text style={styles.correctText}>Benar! +5 XP</Text>
//         )}
