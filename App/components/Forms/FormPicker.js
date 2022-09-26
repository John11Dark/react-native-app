import React from "react";
import { Text } from "react-native";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import Picker from "./AppPicker";
import { Styles } from "../../config/";
export default function AppFormPicker({
  data,
  icon,
  name,
  numOfColumns,
  placeholder,
  PickerItemComponent,
  width,
  title,
  disabled,
  ...otherProps
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      {title && <Text style={Styles.labelStyle}>{title}</Text>}
      <Picker
        data={data}
        icon={values[name].icon}
        numOfColumns={numOfColumns}
        onItemSelect={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        PickerItemComponent={PickerItemComponent}
        selectedItem={values[name]}
        width={width}
        disabled={disabled}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
