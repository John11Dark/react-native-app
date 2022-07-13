import * as Progress from "react-native-progress";

import { Modal, StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";
import React from "react";
import customProps from "../config/customProps";

const UploadIndicator = ({ progress = 0, visible, onFinish }) => (
  <Modal visible={visible}>
    <View style={styles.container}>
      {progress < 1 ? (
        <Progress.Bar
          color={customProps.secondaryColor}
          progress={progress}
          width={200}
        />
      ) : (
        <LottieView
          autoPlay
          loop={false}
          speed={0.8}
          onAnimationFinish={onFinish}
          source={require("../assets/animations/uploaded.json")}
          style={styles.animation}
        />
      )}
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: customProps.primaryColorDark,
  },
  animation: {
    width: 300,
  },
});

export default UploadIndicator;
