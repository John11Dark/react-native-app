import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { customProps, Styles } from "../config";
import Icon from "./Icon";

const DataLoadingError = ({ onPress, text, visible, imageViable = false }) =>
  visible ? (
    <View
      style={{
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        bottom: 25,
      }}
    >
      <Image
        resizeMode="contain"
        source={require("../assets/Images/heroImages/Error.png")}
        style={{
          width: 275,
          height: 275,
          display: imageViable ? "flex" : "none",
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: customProps.darkOpacity,
          width: 350,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          borderRadius: 10,
          top: -15,
        }}
      >
        <Icon
          name="update"
          iconColor={customProps.secondaryColor}
          innerSize={40}
        />
        <Text numberOfLines={3} style={[Styles.errorText]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  ) : null;

export default DataLoadingError;
