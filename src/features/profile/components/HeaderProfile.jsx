import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import styles from '../styles/ProfileScreen'

export const HeaderProfile = ({ name, setName, image, onPickImage }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../../../../assets/image/MascotSad.png")
          }
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
        style={styles.nameInput}
      />
    </View>
  );
};

export default HeaderProfile;
