import { StyleSheet, Text, View } from "react-native";

import Constants from "expo-constants";
import React from "react";
import customProps from "../../config/customProps";
import { useNetInfo } from "@react-native-community/netinfo";
import Icon from "./Icon";

const OfflineNotice = () => {
  const { type, isInternetReachable } = useNetInfo();

  if (type !== "unknown" && isInternetReachable === false) {
    return (
      <View style={styles.container}>
        <Icon
          disabled={true}
          name="signal-cellular-outline"
          iconColor={customProps.importantIconColor}
          backgroundColor="transparent"
          innerSize={40}
          style={{ marginRight: 10 }}
        />
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: customProps.barBackgroundColorOpacity,
    height: 60,
    width: "90%",
    justifyContent: "center",
    position: "absolute",
    top: Constants.statusBarHeight + 10,
    left: 20,
    paddingVertical: 20,
    zIndex: 1,
    borderRadius: 15,
  },
  text: {
    ...customProps.font,
    fontSize: 20,
    fontWeight: "600",
    color: customProps.primaryColorLight,
  },
});

export default OfflineNotice;
