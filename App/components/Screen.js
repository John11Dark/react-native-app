import React from "react";
import { SafeAreaView, Text } from "react-native";
import Constants from "expo-constants";
import customProps from "../config/customProps";
export default function Screen({ children, style, copyRight = false }) {
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
      {
        <Text
          style={{
            display: copyRight ? "flex" : "none",
            ...customProps.font,
            fontSize: 12,
            textAlign: "center",
            color: customProps.primaryColorDarkGray,
          }}
        >
          © Copyright© 2022–Today, Dark Engines . All rights reserved.
        </Text>
      }
    </SafeAreaView>
  );
}
