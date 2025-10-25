import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2937",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 28,
    color: "#6B7280",
    fontWeight: "300",
  },
  progressContainer: {
    flex: 1,
    height: 16,
    backgroundColor: "#374151",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#84CC16",
    borderRadius: 8,
  },
  livesContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EC4899",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  livesIcon: {
    fontSize: 18,
  },
  livesText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 32,
  },
  contentContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 32,
    alignItems: "flex-start",
  },
  characterContainer: {
    marginRight: 16,
  },
  character: {
    width: 120,
    height: 140,
    backgroundColor: "#8B4513",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  characterEmoji: {
    fontSize: 80,
  },
  speechBubble: {
    flex: 1,
    backgroundColor: "#374151",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "#4B5563",
  },
  audioIcon: {
    marginBottom: 8,
  },
  titleQuestion: {
    fontSize: 24,
    color: "white",
    fontWeight: 700,
  },
  speechText: {
    fontSize: 18,
    color: "#FFFFFF",
    lineHeight: 28,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  optionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  optionButton: {
    backgroundColor: "#374151",
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: "#4B5563",
  },
  optionButtonSelected: {
    backgroundColor: "#1E40AF",
    borderColor: "#3B82F6",
  },
  optionText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  optionTextSelected: {
    fontWeight: "600",
  },
  checkButton: {
    backgroundColor: "#10B981",
    marginHorizontal: 16,
    marginTop: "auto",
    marginBottom: 24,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  checkButtonDisabled: {
    backgroundColor: "#374151",
    opacity: 0.5,
  },
  checkButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
});

export default styles;
