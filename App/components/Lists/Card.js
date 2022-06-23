import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import Icon from "../Icon";
import { Image } from "react-native-expo-image-cache";
import ListItem from "./ListItem";
import React from "react";
import customProps from "../../config/customProps";

export default function Card({
  title,
  subTitle,
  status = true,
  onPress,
  innerPress,
  authorName = "John Muller",
  initialDate = "13/12/2022",
  thumbnailUrl,
  imageUrl,
}) {
  return (
    // card Continuer
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContinuerTwo}>
        <Image
          preview={{ uri: thumbnailUrl }}
          tint={"light"}
          uri={imageUrl}
          style={styles.image}
        />

        <View style={styles.contentContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.subTitle}>
            {subTitle}
          </Text>
          <Icon
            onPress={innerPress}
            style={styles.icon}
            backgroundColor={status ? customProps.finished : "transparent"}
            innerSize={50}
            iconColor={
              status
                ? customProps.primaryColorLight
                : customProps.importantIconColor
            }
            name={status ? "check-circle" : "check-circle-outline"}
          />
          <ListItem
            imagePath={require("../../assets/favicon.png")}
            title={authorName}
            subTitle={initialDate}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardContinuerTwo: {
    backgroundColor: customProps.darkCardBackgroundColor,
    borderRadius: 15,
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    overflow: "hidden",
    marginVertical: 15,
    shadowColor: "red",
    shadowOffset: { width: -15, height: -15 },
    shadowOpacity: 1,
    //elevation: 10,
  },
  authorName: {
    color: customProps.secondaryColor,
  },
  bottomCard: {
    width: "100%",
    padding: 0,
  },
  icon: {
    position: "absolute",
    right: 5,
    bottom: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  contentContainer: {
    padding: 25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 5,
  },
  title: {
    fontSize: customProps.largePrimaryTextFontSize,
    color: customProps.primaryColor,
    fontFamily: customProps.primaryFont,
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingVertical: 5,
  },

  subTitle: {
    fontSize: customProps.mediumTextFontSize,
    color: customProps.primaryColorLight,
    fontFamily: customProps.font.primaryFont,
    textTransform: "capitalize",
  },
  date: {
    fontSize: customProps.dateTextFontSize,
    color: customProps.primaryColorLightGray,
    fontFamily: customProps.font.primaryFont,
    paddingVertical: 5,
  },
  status: {
    color: customProps.notFinished,
    fontSize: customProps.smallTextFontSize,
    textAlign: "right",
    top: 0,
    marginLeft: 5,
  },
});
