import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { customProps } from "../../config";
export default function MessageView({
  disabled = false,
  dateTime,
  title,
  imagePath,
  onPress,
  subTitle,
  styleParameter,
  right = false,
}) {
  return (
    <View>
      {!right && (
        <TouchableOpacity
          disabled={disabled}
          underlayColor={customProps.primaryColorDarkOpacity}
          onPress={onPress}
          style={[styles.container, styleParameter]}
        >
          <Image
            preview={{ uri: imagePath.thumbnail }}
            style={styles.image}
            tint={"light"}
            uri={imagePath.url}
          />
          <View style={styles.textContainer}>
            {title && (
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
            )}
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text style={styles.dateTime}>{dateTime}</Text>
          </View>
        </TouchableOpacity>
      )}
      {right && (
        <TouchableOpacity
          disabled={disabled}
          underlayColor={customProps.primaryColorDarkOpacity}
          onPress={onPress}
          style={[
            styles.container,
            styleParameter,
            { justifyContent: "flex-end" },
          ]}
        >
          <View
            style={[
              styles.textContainer,
              {
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 18,
                marginRight: 10,
                marginLeft: 0,
              },
            ]}
          >
            {title && (
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
            )}
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text style={[styles.dateTime, { alignSelf: "flex-start" }]}>
              {dateTime}
            </Text>
          </View>
          <Image
            preview={{ uri: imagePath.thumbnail }}
            style={[styles.image]}
            tint={"light"}
            uri={imagePath.url}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 10,
    margin: 1,
    marginBottom: 5,
  },
  dateTime: {
    alignSelf: "flex-end",
    color: customProps.primaryColorDarkGray,
    marginTop: 5,
    marginRight: 10,
    padding: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
  },
  textContainer: {
    marginLeft: 15,
    marginBottom: 10,
    backgroundColor: customProps.darkCardBackgroundColor,
    padding: 10,
    maxWidth: 320,
    borderRadius: 18,
    borderBottomLeftRadius: 5,
  },

  title: {
    ...customProps.font,
    fontSize: customProps.largePrimaryTextFontSize,
    color: customProps.primaryColorLight,
    fontWeight: "500",
    marginBottom: 2,
    textTransform: "capitalize",
    maxWidth: 285,
  },
  subTitle: {
    ...customProps.font,
    fontSize: customProps.mediumTextFontSize,
    color: customProps.primaryColorLightGray,
    textTransform: "capitalize",
    maxWidth: 310,
  },
});
