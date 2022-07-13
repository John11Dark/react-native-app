import React from "react";
import { SafeAreaView } from "react-native";
import Constants from "expo-constants";
import customProps from "../config/customProps";
export default function Screen({ children, style, imageUrl }) {
  return (
    <SafeAreaView
      style={[
        {
          padding: 5,
          paddingTop: Constants.statusBarHeight + 6,
          width: "100%",
          flex: 1,
          backgroundColor: customProps.primaryColorDark,
        },
        ,
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
