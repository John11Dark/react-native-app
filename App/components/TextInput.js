import { StyleSheet, Text, TextInput, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { customProps, Styles } from "../config";

const AppTextInput = ({
  style,
  icon,
  iconStyle,
  onChangeText,
  placeholder,
  value,
  width = "100%",
  title,
  ...otherProps
}) => {
  return (
    <View style={style}>
      {title && <Text style={Styles.labelStyle}>{title}</Text>}
      <View style={[styles.container, { width }]}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            style={[styles.icon, iconStyle]}
          />
        )}
        <TextInput
          clearButtonMode="always"
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={customProps.primaryColorLightGray}
          style={[styles.text, style]}
          returnKeyType={"done"}
          value={value}
          {...otherProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Styles.formField,
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
    color: Styles.colors.primaryColorLight,
    flex: 1,
    paddingVertical: 6,
    width: "100%",
  },
});

export default AppTextInput;
