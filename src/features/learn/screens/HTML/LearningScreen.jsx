import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import AllLevel from "../../../../../assets/data/HTML/AllLevel";
import styles from "../../../../style/Q1Style";
import ProgressBar from "../../../../components/ProgressBar";
import LifeTimer from "../../../../components/LifeTimer";
import CheckButton from "../../../../components/CheckButton";
import { questionHandlers } from "../../../../hooks/questionHandlers";

export default function LearningScreen() {
  const route = useRoute();
  const { levelId, onFinish } = route.params;

  const questions = AllLevel[levelId] || [];

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

      <Text style={styles.title}>{titleDifficult}</Text>

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

      <CheckButton onPress={handleCheck} disabled={!selectedAnswer} />
    </SafeAreaView>
  );
}
