import { Text, View } from "react-native";

import React from "react";
import Styles from "../../config/Styles/Styles";

export default function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return (
    <View>
      <Text style={Styles.ErrorMessage}>{error}</Text>
    </View>
  );
}
