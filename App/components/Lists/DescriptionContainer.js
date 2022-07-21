import { StyleSheet, View, Text } from "react-native";
import React from "react";

import { customProps } from "../../config";
export default function DescriptionContainer({ title, style, description }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    padding: 10,
  },
  title: {
    ...customProps.font,
    color: customProps.primaryColorDarkGray,
    paddingLeft: 15,
    marginBottom: 5,
  },
  description: {
    ...customProps.font,
    fontSize: 20,
    fontWeight: "400",
    color: customProps.primaryColorLightGray,
  },
  descriptionContainer: {
    justifyContent: "flex-start",
    backgroundColor: customProps.primaryColorDark,
    padding: 20,
    borderRadius: 10,
    maxWidth: 200,
  },
});
