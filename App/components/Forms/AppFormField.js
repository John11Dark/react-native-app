import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import TextInput from "../TextInput";

export default function AppFormField({
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
