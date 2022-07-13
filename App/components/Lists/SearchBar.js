import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import Icon from "../Icon";
import { customProps } from "../../config";

export default function SearchBar({
  visible = true,
  placeholder = "search...",
  icon = "feature-search",
  style = {},
  textChange,
}) {
  /**
   * Search bar component
   * @param {String} placeholder text input placeholder :defaults to "search..."
   * @param {Boolean} visible determents if the container visible or not :defaults to true
   * @param {String} icon icon name :defaults to "search"
   * @param {Function} textChange function rased on text change it gets value as parameter
   * @param {Object} style object of styles :defaults to empty object to use it must pass a parent object that holds
   * styles with params names such as style : {
   * icon : {
   * color: "white"
   * },
   * textInput: {
   * fontSize : {
   * }
   * }
   * }
   */
  return (
    <View
      style={[
        styles.container,
        style.container,
        { display: visible ? "flex" : "none" },
      ]}
    >
      <Icon
        name={icon}
        disabled={true}
        backgroundColor={"transparent"}
        style={style.icon}
        iconColor={customProps.primaryColorDarkGray}
        innerSize={25}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={customProps.primaryColorDarkGray}
        style={[styles.textInput, style.textInput]}
        onChangeText={(value) => textChange(value)}
        returnKeyType={"search"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    width: "85%",
    height: 55,
    backgroundColor: customProps.darkCardBackgroundColor,
    borderRadius: 10,
  },
  textInput: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    fontSize: 20,
    height: "100%",
    width: "100%",
  },
});
