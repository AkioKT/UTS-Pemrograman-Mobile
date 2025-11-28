// BattleScreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { getSocket } from "./socket";

export default function BattleScreen({ route, navigation }) {
  const { roomId, user, startTime } = route.params;
  const socket = getSocket();
  const [question, setQuestion] = useState(null);
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [leaderboard, setLeaderboard] = useState([]);
  const [info, setInfo] = useState(null);
  const [localTimeDiff, setLocalTimeDiff] = useState(0);

  // animation values
  const vsAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(vsAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(vsAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    // compute local diff to server time (simple)
    setLocalTimeDiff(Date.now() - startTime);

    socket.on("new_question", ({ question, index }) => {
      setQuestion(question);
      setIndex(index);
      setStatus("question");
    });

    socket.on("answer_result", (res) => {
      setInfo(res);
    });

    socket.on("battle_ended", ({ leaderboard }) => {
      setLeaderboard(leaderboard);
      setStatus("ended");
    });

    socket.on("answer_ignored", (m) => {
      // optional show toast
    });

    return () => {
      // cleanup
    };
  }, []);

  // compute remaining time for question (server advances every 10s)
  const [remaining, setRemaining] = useState(10);
  useEffect(() => {
    let t = null;
    if (status === "question") {
      setRemaining(10);
      t = setInterval(() => setRemaining((r) => Math.max(r - 1, 0)), 1000);
    }
    return () => clearInterval(t);
  }, [status, question]);

  const submit = (idx) => {
    if (!question) return;
    socket.emit("submit_answer", {
      roomId,
      questionId: question.id,
      answerIndex: idx,
    });
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>VS MODE</Text>
        <View style={s.timer}>
          <Text style={{ color: "#fff" }}>Timer: {remaining}s</Text>
        </View>
      </View>

      <Animated.View style={[s.vsBox, { opacity: vsAnim }]}>
        <Text style={s.vsText}>VS</Text>
      </Animated.View>

      <View style={s.questionBox}>
        <Text style={s.qtext}>{question?.text ?? "Waiting..."}</Text>
        {question?.options?.map((opt, i) => (
          <TouchableOpacity key={i} style={s.option} onPress={() => submit(i)}>
            <Text style={{ color: "#fff" }}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {info && (
        <View style={s.info}>
          <Text style={{ color: "#fff" }}>
            {info.firstResponder?.name ?? "—"} answered{" "}
            {info.isCorrect ? "Correct" : "Wrong"}
          </Text>
        </View>
      )}

      {status === "ended" && (
        <View style={s.leader}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Leaderboard</Text>
          {leaderboard.map((p, i) => (
            <Text key={p.id} style={{ color: "#fff" }}>
              {i + 1}. {p.name} — {p.score}
            </Text>
          ))}
          <TouchableOpacity
            style={s.btn}
            onPress={() => navigation.navigate("BattleLobby")}
          >
            <Text style={{ color: "#fff" }}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1724", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 18 },
  timer: { backgroundColor: "#111827", padding: 8, borderRadius: 8 },
  vsBox: { alignItems: "center", marginTop: 12, marginBottom: 12 },
  vsText: { fontSize: 50, color: "#ef4444", fontWeight: "900" },
  questionBox: { backgroundColor: "#111827", padding: 12, borderRadius: 10 },
  qtext: { color: "#fff", fontSize: 16, marginBottom: 8 },
  option: {
    padding: 12,
    backgroundColor: "#0b1220",
    marginBottom: 8,
    borderRadius: 8,
  },
  info: { marginTop: 12 },
  leader: { marginTop: 16 },
  btn: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
});
