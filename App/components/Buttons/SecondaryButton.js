import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import customProps from "../../config/customProps";

export default function SecondaryButton({ title, handlePress, iconName }) {
  return (
    <TouchableOpacity style={styles.secondaryButton} onPress={handlePress}>
      <Text style={styles.text}>
        {title}{" "}
        <MaterialCommunityIcons
          name={iconName}
          size={22.5}
          color={customProps.secondaryColor}
        />
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: customProps.primaryTextFontSize,
    fontFamily: customProps.primaryFont,
    color: customProps.secondaryColor,
    fontWeight: "bold",
    textAlign: "center",
    width: " 100%",
  },
  secondaryButton: {
    borderColor: customProps.secondaryColor,
    borderWidth: 2.5,
    height: 80,
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    maxWidth: 300,
    flexDirection: "row",
  },
});
