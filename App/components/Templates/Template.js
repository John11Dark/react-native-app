import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { customProps } from "../../config";
export default function Template({ nameProp, title }) {
  function setImageName(name) {
    if (name === "Notifications") {
      return "NotificationsScreen.png";
    } else return "Error.png";
  }
  const path = "NotificationsScreen.png";
  return (
    <View style={styles.container}>
      <Image
        //loadingIndicatorSource={require(imagePath)}
        resizeMode="contain"
        style={styles.image}
        source={require(`../../assets/Images/heroImages/${path}`)}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "90%",
    alignSelf: "center",
    height: 300,
  },
  title: {
    ...customProps.font,
    fontSize: customProps.largePrimaryTextFontSize,
    textAlign: "center",
    color: customProps.primaryColorLight,
    fontWeight: "700",
    margin: 10,
  },
});
