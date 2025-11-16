import React, { useState } from "react";
import { View, ScrollView, StatusBar, StyleSheet } from "react-native";
import HTML from "../../../../assets/image/thumbnail_html.png";
import CSS from "../../../../assets/image/thumbnail_css.png";
import JS from "../../../../assets/image/thumbnail_js.png";
import PHP from "../../../../assets/image/thumbnail_php.png";
import PYTHON from "../../../../assets/image/thumbnail_python.png";
import AppBar from "../../../componentsglobal/AppBar";
import ClassCard from "../../../componentsglobal/ClassCard";

const SelectCategory = () => {
  const [classes] = useState([
    {
      id: 1,
      name: "HTML",
      code: "Hypertext Markup Language",
      image: HTML,
      desc: `HTML is a standard markup language for creating web pages and their structure.`,
    },
    {
      id: 2,
      name: "CSS",
      code: "Cascading Style Sheet",
      image: CSS,
      desc: "CSS (Cascading Style Sheets) is a language used to style and design web pages.",
    },
    {
      id: 3,
      name: "Javascript",
      code: "Javascript",
      image: JS,
      desc: "JavaScript is a powerful programming language that brings interactivity and dynamic behavior to web pages.",
    },
    {
      id: 4,
      name: "Python",
      code: "Python",
      image: PYTHON,
      desc: "🐍 Python is a high-level programming language used for web development, data analysis, artificial intelligence and more.",
    },
    {
      id: 5,
      name: "PHP",
      code: "Hypertext Preprocessor",
      image: PHP,
      desc: "PHP is a popular server-side programming language, especially for web development.",
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
      <StatusBar hidden={true} />
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
