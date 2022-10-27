import React from "react";
import ErrorMessage from "./ErrorMessage";
import Icon from "../Interface/Icon";
import { useFormikContext } from "formik";
import { customProps } from "../../config";
import { Text, View, StyleSheet, TextInput } from "react-native";
export default function EditFiled({
  keyboardAppearance = "dark",
  icon,
  edit = false,
  editBtnVisible,
  name,
  placeholder,
  style,
  onPress,
  ...otherProps
}) {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext();

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.placeholderText}>{placeholder}</Text>

      <View style={styles.textInputBox}>
        <Icon
          disabled={true}
          name={icon}
          iconColor={customProps.primaryColorDarkGray}
          backgroundColor="transparent"
          innerSize={35}
          size={35}
        />
        <TextInput
          clearButtonMode="never"
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          placeholder={"type here..."}
          editable={edit}
          style={styles.textInput}
          {...otherProps}
        />
        <Icon
          name={edit ? "draw-pen" : "pencil-lock"}
          iconColor={
            edit ? customProps.primaryColor : customProps.secondaryColor
          }
          backgroundColor="transparent"
          innerSize={35}
          size={35}
          onPress={onPress}
          style={{ display: editBtnVisible ? "flex" : "none" }}
        />
      </View>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    width: "100%",
    marginVertical: 10,
  },
  textInputBox: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: customProps.darkOpacity,
    borderRadius: 10,
    padding: 20,
  },
  textInput: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    width: "80%",
    fontSize: 22,
    marginLeft: 5,
    flex: 1,
  },
  placeholderText: {
    color: customProps.primaryColorLightGray,
    ...customProps.font,
    fontSize: 20,
    paddingLeft: 10,
  },
});
