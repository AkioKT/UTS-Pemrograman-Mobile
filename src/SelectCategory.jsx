import React, { useState } from "react";
import { View, ScrollView, StatusBar, StyleSheet } from "react-native";
import HTML from "../assets/image/HTML.png";
import AppBar from "./components/AppBar";
import ClassCard from "./components/ClassCard";
import FabButton from "./components/FabButton";
import ClassModal from "./components/ClassModal";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SelectCategory = () => {
  const [classes] = useState([
    {
      id: 1,
      name: "HTML",
      code: "Hypertext Markup Language",
      image: HTML,
      desc: `HTML (HyperText Markup Language) is the standard language used to create and structure web pages. It uses tags or elements to define different parts of a webpage such as text, images, links, tables, and videos, allowing browsers to display content correctly.`,
    },
    {
      id: 2,
      name: "CSS",
      code: "Cascading Style Sheet",
      image: "",
      desc: "CSS (Cascading Style Sheets) is a language used to style and design web pages. It defines how HTML elements are displayed by controlling colors, fonts, spacing, and layouts. CSS helps make websites more attractive, organized, and responsive across different devices. Modern CSS also supports animations and flexible layouts using tools like Flexbox and Grid.",
    },
    {
      id: 3,
      name: "Javascript",
      code: "Javascript",
      image: "",
      desc: "JavaScript is a powerful programming language that brings interactivity and dynamic behavior to web pages. It allows developers to create animations, handle user input, and update content without reloading the page. JavaScript works alongside HTML and CSS to build modern, responsive web applications. It can also run on servers through environments like Node.js, making it a full-stack development tool.",
    },
    {
      id: 4,
      name: "Python",
      code: "Python",
      image: "",
      desc: "Python is a versatile and easy-to-learn programming language widely used in web development, data science, artificial intelligence, and automation. Its simple syntax makes coding more readable and efficient. Python offers many frameworks, such as Django and Flask, which simplify web development and make it easier to build reliable, scalable applications.",
    },
    {
      id: 5,
      name: "PHP",
      code: "Hypertext Preprocessor",
      image: "",
      desc: "PHP (Hypertext Preprocessor) is a server-side scripting language mainly used for building dynamic and database-driven websites. It can be embedded directly into HTML and is known for its ease of use and flexibility. PHP powers many popular web platforms, including WordPress, and continues to be a reliable choice for developing modern web applications.",
    },
  ]);

  const [selectedClass, setSelectedClass] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const openClass = (cls) => {
    if (cls.name === "HTML") {
      navigation.navigate("HtmlLevel");
    } else if (cls.name === "CSS") {
      navigation.navigate("CssLevel");
    } else if (cls.name === "Javascript") {
      navigation.navigate("JavascriptLevel");
    } else if (cls.name === "Phyton") {
      navigation.navigate("PhytonLevel");
    } else if (cls.name === "PHP") {
      navigation.navigate("PHPLevel");
    } else {
      openModal(cls);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f1f1f" />
      <AppBar />
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardsContainer}>
          {classes.map((cls) => (
            <ClassCard
              key={cls.id}
              classData={cls}
              onPress={() => openClass(cls)}
            />
          ))}
        </View>
      </ScrollView>

      {/* <FabButton onPress={() => console.log("Tambah Kelas")} /> */}
      <ClassModal
        visible={modalVisible}
        classData={selectedClass}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    width: "100%",
  },
  scrollView: { padding: 16 },
  cardsContainer: { marginTop: 10 },
});

export default SelectCategory;
