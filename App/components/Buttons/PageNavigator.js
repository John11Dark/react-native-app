// ? * --> Third parties dependencies
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { customProps } from "../../config";

// ? * --> main Stack
export default function PageNavigator({ label, linkLabel, screen, style }) {
  // ? * --> Hooks
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label} </Text>}
      <TouchableOpacity onPress={() => navigation.navigate(screen)}>
        <Text style={styles.link}>{linkLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

// ? * --> styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    alignSelf: "flex-end",
  },
  label: {
    ...customProps.font,
    color: customProps.primaryColorLightGray,
    fontSize: 20,
    marginRight: 2,
  },
  link: {
    ...customProps.font,
    color: customProps.primaryColor,
    textTransform: "capitalize",
    fontSize: 22,
  },
});
