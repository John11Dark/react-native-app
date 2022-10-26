import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { customProps } from "../../config";
import Icon from "../Icon";
import Map from "../Map";

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customProps.darkOpacity,
    width: "90%",
    alignSelf: "center",
    borderRadius: 7.5,
    marginVertical: 10,
    overflow: "hidden",
  },
  header: {
    backgroundColor: customProps.secondaryColor,
    width: "100%",
    padding: 10,
    flex: 1,
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
