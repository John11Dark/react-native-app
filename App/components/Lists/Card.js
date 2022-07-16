import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import Icon from "../Icon";
import ListItem from "./ListItem";
import customProps from "../../config/customProps";
import { listingsApi } from "../../api";

export default function Card({
  title,
  subTitle,
  status,
  onPress,
  initialDate,
  thumbnailUrl,
  imageUrl,
  user,
  listId,
  archive,
  restore,
  handleState,
}) {
  const [projectStatus, setProjectStatus] = useState(status);

  const handleStatusUpdate = (status) => {
    Alert.alert(
      "Change Project Status",
      `Are you sure you want to mark ${title} as ${
        projectStatus ? "not ready" : "ready"
      }?`,
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            status = status ? false : true;
            setProjectStatus(status);
            listingsApi.updateListings(listId, { status: status });
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };
  useEffect(() => {
    setProjectStatus(status);
  }, [status]);
  return (
    // card Continuer
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContinuerTwo}>
        <Image
          preview={{ uri: thumbnailUrl }}
          tint={"dark"}
          uri={imageUrl}
          style={styles.image}
        />

        <View style={styles.contentContainer}>
          {/* Title */}
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {/* Description */}
          <Text numberOfLines={2} style={styles.subTitle}>
            {subTitle}
          </Text>

          <View style={styles.bottomContainer}>
            {/*  created date and by */}
            <ListItem
              imagePath={user.image}
              title={user.name}
              subTitle={initialDate}
              textWidth={"50%"}
              disabled={true}
            />
            {/* Status icon */}

            {archive ? (
              <Icon
                onPress={() => handleState(listId)}
                style={styles.icon}
                backgroundColor={"transparent"}
                innerSize={80}
                iconColor={customProps.secondaryColor}
                name={projectStatus ? "archive-cancel" : "archive"}
              />
            ) : restore ? (
              <Icon
                onPress={() => handleState(listId)}
                style={styles.icon}
                backgroundColor={"transparent"}
                innerSize={80}
                iconColor={customProps.greenColor}
                name={"delete-restore"}
              />
            ) : (
              <Icon
                onPress={() => handleStatusUpdate(projectStatus)}
                style={styles.icon}
                backgroundColor={
                  projectStatus ? customProps.finished : "transparent"
                }
                innerSize={80}
                iconColor={
                  projectStatus
                    ? customProps.primaryColorLight
                    : customProps.importantIconColor
                }
                name={projectStatus ? "check-circle" : "check-circle-outline"}
              />
            )}
          </View>
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
    width: Platform.OS === "android" ? "100%" : "95%",
    alignSelf: "center",
    alignItems: "flex-start",
    overflow: "hidden",
    marginVertical: 15,
  },
  authorName: {
    color: customProps.secondaryColor,
  },
  bottomCard: {
    width: "100%",
    padding: 0,
  },
  icon: {
    zIndex: 5,
    width: 80,
    height: 80,
    borderRadius: 45,
    right: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  contentContainer: {
    padding: Platform.OS === "android" ? 18 : 25,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 5,
  },
  title: {
    ...customProps.font,
    color: customProps.primaryColor,
    fontSize: customProps.largePrimaryTextFontSize,
    fontWeight: "bold",
    textTransform: "capitalize",
    paddingVertical: 5,
  },

  subTitle: {
    ...customProps.font,
    fontSize: customProps.mediumTextFontSize,
    color: customProps.primaryColorLight,
    textTransform: "capitalize",
  },
  date: {
    fontSize: customProps.dateTextFontSize,
    color: customProps.primaryColorLightGray,
    ...customProps.font,
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
