import { View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import customProps from "../../config/customProps";

export default function OverlayUploadIndicator({
  width = 300,
  visible,
  onFinish,
}) {
  return (
    <View
      style={{
        display: visible ? "flex" : "none",
        zIndex: 5,
        position: "absolute",
        top: 300,
        left: 75,
        backgroundColor: customProps.darkOpacity,
        borderRadius: 10,
      }}
    >
      <LottieView
        autoPlay
        loop={false}
        speed={0.5}
        onAnimationFinish={onFinish}
        source={require("../../assets/animations/uploaded.json")}
        style={{ width: width }}
      />
    </View>
  );
}
