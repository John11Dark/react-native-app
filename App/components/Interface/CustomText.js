import React from "react";
import { Text, View } from "react-native";

export default function CustomText({ title, type }) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
