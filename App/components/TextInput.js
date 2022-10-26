import { StyleSheet, Text, TextInput, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { customProps, Styles } from "../config";
import Icon from "./Icon";

const AppTextInput = ({
  style,
  icon,
  iconStyle,
  onChangeText,
  placeholder,
  value,
  width = "100%",
  title,
  secondIcon,
  secondIconEnabled,
  onSecondIconPress,
  ...otherProps
}) => {
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
};

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

export default AppTextInput;
