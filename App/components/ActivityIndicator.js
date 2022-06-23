import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";
import React from "react";
import customProps from "../config/customProps";

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../assets/animations/loader.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: customProps.primaryColorDark,
    height: "100%",
    opacity: 0.7,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});

export default ActivityIndicator;
