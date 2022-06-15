import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import customProps from "../../config/customProps";

export default function PrimaryButton({ title, handlePress, iconName }) {
  return (
    <TouchableOpacity style={styles.primaryButton} onPress={handlePress}>
      <Text style={styles.text}>
        {title}{" "}
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={customProps.primaryColorLight}
        />
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontFamily: customProps.primaryFont,
    color: customProps.primaryColorLight,
    fontWeight: "bold",
  },
  primaryButton: {
    heigh: 100,
    borderRadius: 10,
    backgroundColor: customProps.secondaryColor,
    paddingHorizontal: 25,
    paddingVertical: 12,
    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    maxWidth: 250,
    flexDirection: "row",
  },
});
