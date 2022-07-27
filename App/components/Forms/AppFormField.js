import ErrorMessage from "./ErrorMessage";
import React from "react";
import TextInput from "../TextInput";
import { useFormikContext } from "formik";

export default function AppFormField({
  keyboardAppearance = "dark",
  icon,
  name,
  placeholder,
  width,
  style,
  getValue,
  ...otherProps
}) {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext();
  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => {
          setFieldValue(name, text);
          if (getValue) getValue(text);
        }}
        icon={icon}
        placeholder={placeholder}
        value={values[name]}
        width={width}
        style={style}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
