import { useState, useContext } from "react";
import { LivesContext } from "../context/LivesContext";
import CorrectAnswer from "../sounds/CorrectAnswer";
import WrongAnswer from "../sounds/WrongAnswer";
import { useNavigation } from "@react-navigation/native";

export const questionHandlers = (questions, onFinish) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const question = questions[currentQuestion];
  const navigation = useNavigation();
  const { lives, loseLife } = useContext(LivesContext);

  const titleDifficult =
    currentQuestion >= 8 ? "Hard" : currentQuestion >= 5 ? "Medium" : "Easy";

  const handleAnswerPress = (id) => setSelectedAnswer(id);

  const handleCheck = async () => {
    if (selectedAnswer === question.correctAnswer) {
      CorrectAnswer();
      setAnswers((prev) => ({ ...prev, [currentQuestion]: selectedAnswer }));

      if (currentQuestion < questions.length - 1) {
        setSelectedAnswer(null);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert("🎊 Semua pertanyaan selesai!");
        if (onFinish) onFinish();
        navigation.goBack();
      }
    } else {
      WrongAnswer();
      await loseLife(1);
    }
  };

  const closeButton = () => navigation.goBack();

  const progress = currentQuestion / questions.length;

  return {
    currentQuestion,
    selectedAnswer,
    question,
    setSelectedAnswer,
    handleAnswerPress,
    handleCheck,
    closeButton,
    titleDifficult,
    progress,
  };
};
