import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Icon from "../Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import customProps from "../../config/customProps";

export default function Card({
  title,
  subTitle,
  initialDate,
  status,
  imagePath,
  removeHandlePress,
  onPress,
}) {
  return (
    // card Continuer
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContinuer}>
        {/* image */}
        <Image source={imagePath} style={styles.image} />

        <View>
          {/* Text */}
          <View style={styles.textContinuer}>
            <View style={styles.flexRow}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
              </Text>
              <Text style={styles.date}>{initialDate}</Text>
            </View>
            <Text numberOfLines={2} style={styles.subTitle}>
              {subTitle}
            </Text>
          </View>
        </View>
        <Icon
          style={styles.icon}
          backgroundColor={
            status ? customProps.notFinished : customProps.importantIconColor
          }
          size={30}
          innerSize={31}
          name={status ? "check-circle" : "check-circle-outline"}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardContinuer: {
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
  icon: {
    position: "absolute",
    right: 5,
    bottom: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "Center",
    width: "80%",
    flex: 1,
    backgroundColor: "red",
  },
  textContinuer: {
    padding: 15,
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
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
    textAlign: "left",
  },

  subTitle: {
    fontSize: customProps.mediumTextFontSize,
    color: customProps.primaryColorLight,
    fontFamily: customProps.primaryFont,
    textTransform: "capitalize",
  },
  date: {
    fontSize: customProps.dateTextFontSize,
    color: customProps.primaryColorLightGray,
    fontFamily: customProps.primaryFont,
    textAlign: "right",
    marginLeft: 5,
    position: "absolute",
    right: 0,
  },
  status: {
    color: customProps.notFinished,
    fontSize: customProps.smallTextFontSize,
    textAlign: "right",
    marginLeft: 5,
  },
});
