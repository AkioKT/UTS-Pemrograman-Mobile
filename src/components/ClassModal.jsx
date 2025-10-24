import React from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";

const ClassModal = ({ visible, onClose, classData }) => {
  if (!classData) return null;

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          <View style={[styles.header, { backgroundColor: classData.colors[1] }]}>
            <Text style={styles.title}>{classData.name}</Text>
            <Text style={styles.subtitle}>{classData.code}</Text>
            <Text style={styles.teacher}>{classData.teacher}</Text>
          </View>

          <View style={styles.body}>
            <Text style={styles.info}>Tugas Aktif: {classData.assignments}</Text>
            <Text style={styles.info}>Kode Kelas: {classData.code}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.btnOutline} onPress={onClose}>
              <Text style={styles.btnOutlineText}>Tutup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFilled}>
              <Text style={styles.btnFilledText}>Buka Kelas</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 14, color: "#f1f1f1" },
  teacher: { fontSize: 12, color: "#f9f9f9" },
  body: { padding: 20 },
  info: { fontSize: 14, marginBottom: 8 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 8,
  },
  btnOutlineText: { color: "#333" },
  btnFilled: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
  btnFilledText: { color: "#fff" },
});

export default ClassModal;
