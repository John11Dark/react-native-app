import { Modal, StyleSheet, View, Platform } from "react-native";
import React, { useState } from "react";
import DatePicker from "@react-native-community/datetimepicker";

import Icon from "../Icon";
import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { customProps } from "../../config";
import { useFormikContext } from "formik";

const DateTimePicker = ({
  name = "initialDate",
  title = "Initial Date",
  placeholder = "ex: Mon Jun 10 2022",
  otherProps,
  enabled,
}) => {
  // states
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const { errors, setFieldValue, values } = useFormikContext();
  return (
    <>
      <TextInput
        name={name}
        placeholder={placeholder}
        value={values[name]}
        icon="calendar"
        secondIcon="calendar-edit"
        secondIconEnabled={enabled}
        onSecondIconPress={() => setVisible(!visible)}
        title={title}
        editable={false}
        clearButtonMode="never"
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={errors[name]} />

      <Modal animationType="slide" visible={visible} transparent={true}>
        {Platform.OS === "ios" ? (
          <View style={styles.boxView}>
            <Icon
              name="close"
              innerSize={35}
              iconColor={customProps.secondaryColor}
              backgroundColor="transparent"
              style={styles.icon}
              onPress={() => {
                setVisible(!visible);
              }}
            />
            <DatePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              display="spinner"
              onChange={(_, value) => {
                setFieldValue(name, value.toDateString());
                setDate(value);
              }}
            />
          </View>
        ) : (
          <DatePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(_, value) => {
              setFieldValue(name, value.toDateString());
              setVisible(!visible);
              setDate(value);
            }}
            style={{ zIndex: 10 }}
          />
        )}
      </Modal>
    </>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 5,
  },
  boxView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    height: 240,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOpacity: 0.7,
    shadowRadius: 25,
    shadowColor: customProps.primaryColorDark,
    backgroundColor: customProps.darkOpacity,
  },
});
