import ErrorMessage from "./ErrorMessage";
import Picker from "./AppPicker";
import React from "react";
import { Text } from "react-native";
import customProps from "../../config/customProps";
import { useFormikContext } from "formik";

export default function AppFormPicker({
  data,
  icon,
  name,
  numOfColumns,
  placeholder,
  PickerItemComponent,
  width,
  title,
  ...otherProps
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      {title && <Text style={customProps.labelStyle}>{title}</Text>}
      <Picker
        data={data}
        icon={icon}
        numOfColumns={numOfColumns}
        onItemSelect={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        PickerItemComponent={PickerItemComponent}
        selectedItem={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
