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
          color={customProps.primaryColor}
          progress={progress}
          width={200}
        />
      ) : (
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={onFinish}
          source={require("../assets/animations/done1.json")}
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
  },
  animation: {
    width: 150,
  },
});

export default UploadIndicator;
