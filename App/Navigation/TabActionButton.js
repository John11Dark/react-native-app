import { StyleSheet, TouchableHighlight } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import customProps from "../config/customProps";

export default function TabActionButton({ onPress }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.container}
      underlayColor={customProps.primaryColorLightGray}
    >
      <MaterialCommunityIcons name="plus-circle" style={styles.icon} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: customProps.secondaryColor,
    borderColor: customProps.barBackgroundColor,
    borderWidth: 6,
    borderRadius: 40,
    bottom: 30,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  icon: {
    fontSize: 45,
    color: customProps.primaryColorLight,
  },
});
