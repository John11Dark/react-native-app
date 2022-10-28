// ? * --> Third parties dependencies
import React, { useEffect } from "react";
import { useFormikContext } from "formik";

// ? * --> custom dependencies
import ErrorMessage from "./ErrorMessage";
import TextInput from "../Interface/TextInput";

// ? * -->  main Stack
export default function AppFormField({
  icon,
  name,
  placeholder,
  width,
  style,
  getValue,
  setError,
  handleSubmitProp,
  ...otherProps
}) {
  const {
    errors,
    setFieldTouched,
    setFieldValue,
    touched,
    values,
    handleSubmit,
  } = useFormikContext();

  useEffect(() => {
    if (errors[name]) {
      if (setError) setError(true);
    } else {
      if (setError) setError(false);
    }
  }, [errors]);

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => {
          setFieldValue(name, text);
          if (getValue) getValue(text);
        }}
        onEndEditing={handleSubmitProp === true ? handleSubmit : undefined}
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
