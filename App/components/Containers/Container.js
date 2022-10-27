// ? * --> Third parties dependencies
import { StyleSheet, View, Text } from "react-native";
import React from "react";
// ? * --> custom dependencies
import { customProps } from "../../config";
import Icon from "../Interface/Icon";
import Map from "../Interface/Map";
// ? * --> mainStack
export default function Container({
  children,
  title,
  icon = "information-outline",
  pin,
  locationTitle,
  map = false,
  visible,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Icon
          name={icon}
          disabled={true}
          iconColor={customProps.primaryColorLightOpacity}
        />
      </View>
      <View>{children}</View>
      {map && visible && (
        <Map
          projectPin={pin}
          title={locationTitle}
          style={{ borderRadius: 0, marginBottom: 0 }}
        />
      )}
    </View>
  );
}
// ? * --> Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 30,
  },
  header: {
    backgroundColor: customProps.darkOpacity,
    width: "100%",
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    fontWeight: "800",
    textTransform: "capitalize",
  },
});
