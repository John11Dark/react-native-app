import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Screen } from "../../components";
import { customProps } from "../../config";

export default function AboutScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../assets/mainIcon.png")}
        />
        <Text style={styles.title}> Dolphin Pools Limited</Text>
        <Text style={styles.subTitle}>
          Version 1.0.0 ( {Platform?.OS?.toUpperCase()} )
        </Text>
        <View style={styles.linksContainer}>
          <Link title={"Acknowledgments"} url={"https://johnmuller.eu/"} />
          <Link title={"EULA"} url={"https://johnmuller.eu/"} />
          <Link title={"Privacy Policy"} url={"https://johnmuller.eu/"} />
        </View>
        <Text style={styles.copyRight}>
          Copyright© 2022–Today, Dark Engines Ltd. All rights reserved.
        </Text>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "95%",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    ...customProps.font,
    color: customProps.primaryColor,
    fontWeight: "700",
    fontSize: 35,
    marginBottom: 5,
  },
  subTitle: {
    ...customProps.font,
    color: customProps.primaryColorDarkGray,
  },
  linksContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-around",
    maxHeight: 150,
    margin: 20,
  },
  copyRight: {
    ...customProps.font,
    color: customProps.primaryColorLightGray,
    fontSize: 13,
    textAlign: "center",
    position: "absolute",
    bottom: 0,
  },
});
