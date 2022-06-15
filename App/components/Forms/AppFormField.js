import ErrorMessage from "./ErrorMessage";
import React from "react";
import TextInput from "../TextInput";
import { useFormikContext } from "formik";

export default function AppFormField({
  icon,
  name,
  placeholder,
  width,
  ...otherProps
}) {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        icon={icon}
        placeholder={placeholder}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
