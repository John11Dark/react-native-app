import { StyleSheet, TextInput, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import customProps from "../config/customProps";

const AppTextInput = ({
  style,
  icon,
  iconStyle,
  onChangeText,
  placeholder,
  value,
  width = "100%",
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons name={icon} style={[styles.icon, iconStyle]} />
      )}
      <TextInput
        clearButtonMode="always"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={customProps.primaryColorLightGray}
        style={[styles.text, style]}
        value={value}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...customProps.formField,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  icon: {
    color: customProps.primaryColorLightGray,
    fontSize: 20,
    marginRight: 10,
  },
  text: {
    ...customProps.font,
    fontSize: 22.5,
    flex: 1,
    paddingVertical: 6,
  },
});

export default AppTextInput;
