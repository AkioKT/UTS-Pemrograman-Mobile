import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import questions from "../../assets/data/HTML/Level3.json";
import { useRoute } from "@react-navigation/native";
import styles from "../style/Q1Style";
import ProgressBar from "../components/ProgressBar";
import { ScrollView } from "react-native";
import LifeTimer from "../components/LifeTimer";
import CheckButton from "../components/CheckButton";
import { questionHandlers } from "../hooks/questionHandlers";

export default function LanguageLearningScreen() {
  const route = useRoute();
  const { onFinish } = route.params;

  const {
    selectedAnswer,
    question,
    handleAnswerPress,
    handleCheck,
    closeButton,
    titleDifficult,
    progress,
  } = questionHandlers(questions, onFinish);
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
          <LifeTimer />
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
      <ScrollView style={styles.optionGap}>
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
      </ScrollView>
      {/* Check Button */}
      <CheckButton onPress={handleCheck} disabled={!selectedAnswer} />
    </SafeAreaView>
  );
}
