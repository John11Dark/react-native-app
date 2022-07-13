import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { customProps } from "../../config";

const PickerItem = ({ item, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={{
          backgroundColor: item.backgroundColor,
          width: 75,
          height: 75,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 37.5,
        }}
      >
        <MaterialCommunityIcons
          name={item.icon}
          size={60}
          color={customProps.primaryColorLight}
        />
      </View>
      <Text style={styles.text} numberOfLines={2}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "6%",
    paddingVertical: "6%",
    alignItems: "center",
    width: "33%",
  },
  text: {
    marginTop: 8,
    textAlign: "center",
    flexWrap: "nowrap",
    color: customProps.primaryColorLight,
    ...customProps.font,
    fontSize: 15,
    textTransform: "capitalize",
  },
});

export default PickerItem;
