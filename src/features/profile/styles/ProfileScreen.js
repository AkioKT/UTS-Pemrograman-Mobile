import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f3f3",
  },

  // Header
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 80,
    backgroundColor: "#ccc",
  },
  nameInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    width: 180,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },

  // Card style
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  label: {
    fontWeight: "600",
    marginTop: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },

  resetButton: {
    backgroundColor: "#e53935",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },

  saveButton: {
    backgroundColor: "#1e88e5",
    padding: 14,
    borderRadius: 12,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default styles;