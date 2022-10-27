import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import TextInput from "../Interface/TextInput";

export default function AppFormField({
  icon,
  name,
  placeholder,
  width,
  style,
  getValue,
  setError,
  ...otherProps
}) {
  const { errors, setFieldTouched, setFieldValue, touched, values } =
    useFormikContext();
  // if (errors[name]) {
  //   if (setError) setError(true);
  // } else {
  //   if (setError) setError(false);
  // }
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
