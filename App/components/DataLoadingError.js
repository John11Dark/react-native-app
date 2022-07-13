import React from "react";
import { Image, Text, View } from "react-native";
import { Styles } from "../config";
import Icon from "./Icon";

const DataLoadingError = ({ onPress, text, visible, imageViable = false }) =>
  visible ? (
    <>
      <Image
        resizeMode="contain"
        source={require("../assets/Images/heroImages/Error.png")}
        style={[
          Styles.heroImageError,
          { display: imageViable ? "flex" : "none" },
        ]}
      />
      <View style={Styles.errorContainer}>
        <Icon name="update" onPress={onPress} />
        <Text style={[Styles.errorText]}>{text}</Text>
      </View>
    </>
  ) : null;

export default DataLoadingError;
