// ? * --> Third Parties dependencies
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// ? * --> Custom dependencies
import { customProps, Styles } from "../../config";
import Icon from "./Icon";

// ? * -->  Main Stack
export default function AppTextInput({
  style,
  icon,
  iconStyle,
  placeholder,
  value,
  width = "100%",
  title,
  secondIcon,
  secondIconEnabled,
  onChangeText,
  onSecondIconPress,
  onEndEditing,
  ...otherProps
}) {
  return (
    <View style={style}>
      {title && <Text style={Styles.labelStyle}>{title}</Text>}
      <View style={[styles.container, { width }]}>
        {icon && (
          <Icon
            name={icon}
            backgroundColor="transparent"
            iconColor={customProps.primaryColorLightGray}
            style={[styles.icon, iconStyle]}
            disabled={true}
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
          keyboardAppearance={customProps.theme}
          autoCapitalize={"none"}
          autoCorrect={false}
          onEndEditing={onEndEditing}
          {...otherProps}
        />
        {secondIcon && (
          <Icon
            name={secondIcon}
            iconColor={customProps.secondaryColor}
            onPress={onSecondIconPress}
            backgroundColor="transparent"
            disabled={secondIconEnabled}
          />
        )}
      </View>
    </View>
  );
}
// ? * --> Styles
const styles = StyleSheet.create({
  container: {
    ...Styles.formField,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  icon: {
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
