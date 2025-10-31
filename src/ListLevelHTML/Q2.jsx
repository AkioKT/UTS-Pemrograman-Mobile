import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import questions from "../../assets/data/HTML/Level2.json";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../style/Q1Style";
import CorrectAnswer from "../sounds/CorrectAnswer";
import WrongAnswer from "../sounds/WrongAnswer";
import ProgressBar from "../components/ProgressBar";

export default function LanguageLearningScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const progress = (currentQuestion + 1) / questions.length;
  const question = questions[currentQuestion];

  const route = useRoute();
  const navigation = useNavigation();
  const { onFinish } = route.params;

  // Tentukan tingkat kesulitan berdasarkan nomor soal
  const titleDifficult =
    currentQuestion >= 8 ? "Hard" : currentQuestion >= 5 ? "Medium" : "Easy";

  const handleAnswerPress = (id) => setSelectedAnswer(id);

  const handleCheck = () => {
    if (selectedAnswer === question.correctAnswer) {
      CorrectAnswer();

      // simpan jawaban
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion]: selectedAnswer,
      }));

      // pindah ke soal berikutnya setelah delay kecil
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => {
          setSelectedAnswer(null);
          setCurrentQuestion(currentQuestion + 1);
        }, 100);
      } else {
        // semua soal selesai
        alert("🎊 Semua pertanyaan selesai!");
        if (onFinish) onFinish();
        navigation.goBack();
      }
    } else {
      WrongAnswer();
    }
  };

  const closeButton = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        <ProgressBar progress={progress} />

        <View style={styles.livesContainer}>
          <Text style={styles.livesIcon}>⚡</Text>
          <Text style={styles.livesText}>25</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{titleDifficult}</Text>

      {/* Character and Speech Bubble */}
      <View style={styles.contentContainer}>
        <View style={styles.speechBubble}>
          <View style={styles.audioIcon}>
            <Text style={styles.titleQuestion}>Question</Text>
          </View>
          <Text style={styles.speechText}>{question.text}</Text>
        </View>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>{question.questionText}</Text>

      {/* Answer Options */}
      <View style={styles.optionsContainer}>
        {question.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              selectedAnswer === option.id && styles.optionButtonSelected,
            ]}
            onPress={() => handleAnswerPress(option.id)}
          >
            <Text
              style={[
                styles.optionText,
                selectedAnswer === option.id && styles.optionTextSelected,
              ]}
            >
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Check Button */}
      <TouchableOpacity
        style={[
          styles.checkButton,
          !selectedAnswer && styles.checkButtonDisabled,
        ]}
        onPress={handleCheck}
        disabled={!selectedAnswer}
      >
        <Text style={styles.checkButtonText}>CHECK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
