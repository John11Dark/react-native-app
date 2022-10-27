import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { customProps } from "../../config";
import { useFormikContext } from "formik";
import ErrorMessage from "../Forms/ErrorMessage";

const CheckBox = ({
  name,
  width = 120,
  placeholder,
  onPress,
  choiceOne,
  choiceTwo,
  selected = true,
  disabled = false,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <View style={styles.continuer}>
      <Text style={styles.title}>{placeholder}</Text>
      <View style={styles.buttonsContinuer}>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.button,
            {
              backgroundColor: selected
                ? customProps.secondaryColor
                : "transparent",
              width,
            },
          ]}
          onPress={(value = true) => {
            setFieldValue(name, value);
            onPress(value);
          }}
        >
          <Text style={styles.text}>{choiceOne}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disabled}
          style={[
            styles.button,
            {
              backgroundColor: !selected
                ? customProps.secondaryColor
                : "transparent",
              width,
            },
          ]}
          onPress={(value = false) => {
            setFieldValue(name, value);
            onPress(value);
          }}
        >
          <Text style={styles.text}>{choiceTwo}</Text>
        </TouchableOpacity>
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 60,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: customProps.secondaryColor,
    borderWidth: 2,
  },
  text: {
    ...customProps.font,
    color: customProps.primaryColorLight,
  },
  title: {
    ...customProps.font,
    textAlign: "left",
    fontSize: 25,
    color: "#EDEEE4",
    width: "100%",
    padding: 10,
  },
  continuer: {
    width: "100%",
    margin: 10,
  },
  buttonsContinuer: {
    width: "100%",
    padding: 10,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: customProps.secondaryColor,
    borderBottomWidth: 2,
    borderRadius: 10,
  },
});
