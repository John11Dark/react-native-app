import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { customProps } from "../../config";
export default function Dialog({
  title = "info",
  description,
  buttons = [{ text: "Ok" }, { text: "No" }],
  visible,
}) {
  const [textContent, setTextContent] = useState();

  // ? * --> refs
  const inputRef = useRef();

  // ? * --> Effect

  return (
    <View style={[styles.container, { display: visible ? "flex" : "none" }]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <TextInput
        autoCapitalize={"words"}
        clearButtonMode={"while-editing"}
        autoFocus
        style={styles.textInput}
        onChangeText={(text) => setTextContent(text)}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            buttons[0]?.onPress();
          }}
        >
          <Text style={[styles.text]}>{buttons[0].text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            buttons[1]?.onPress(textContent);
            Keyboard.dismiss();
          }}
        >
          <Text style={[styles.text]}>{buttons[1].text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: customProps.darkCardBackgroundColor,
    width: Dimensions.get("screen").width / 1.2,
    maxWidth: Platform.isPad ? 400 : 300,
    height: 250,
    position: "absolute",
    top: Dimensions.get("screen").height / 3,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
  },
  buttonsContainer: {
    width: 300,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    textTransform: "capitalize",
  },
  text: {
    ...customProps.font,
    fontSize: 20,
    color: customProps.primaryColor,
    width: 150,
    height: 50,
    margin: 10,
    textTransform: "capitalize",
    textAlign: "center",
  },
  title: {
    ...customProps.font,
    fontWeight: "800",
    color: customProps.primaryColorLight,
    textAlign: "center",
    margin: 5,
  },
  description: {
    ...customProps.font,
    fontSize: customProps.descriptionTextFontSize,
    fontWeight: "400",
    color: customProps.primaryColorDarkGray,
    textAlign: "center",
  },
  textInput: {
    width: 280,
    margin: 15,
    height: 50,
    alignSelf: "center",
    backgroundColor: customProps.darkOpacity,
    borderRadius: 5,
    color: customProps.primaryColorLight,
    padding: 10,
  },
});
