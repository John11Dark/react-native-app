import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { customProps } from "../../config/";

export default function PrimaryButton({
  title,
  handlePress,
  iconName,
  width = "90%",
  height,
  visible = true,
  marginTop,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.primaryButton,
        { display: visible ? "flex" : "none", width, marginTop },
      ]}
      onPress={handlePress}
    >
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
    ...customProps.font,
    fontSize: 25,
    color: customProps.primaryColorLight,
    fontWeight: "bold",
  },
  primaryButton: {
    height: 80,
    borderRadius: 10,
    backgroundColor: customProps.secondaryColor,
    paddingHorizontal: 25,
    paddingVertical: 15,
    margin: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    maxWidth: 300,
    flexDirection: "row",
  },
});
