// ? * --> Third parties dependencies
import React from "react";
import { useFormikContext } from "formik";

// ? * --> custom dependencies
import PrimaryButton from "./PrimaryButton";
// ? * --> Main Stack
export default function SubmitButton({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <PrimaryButton
      width={300}
      title={title}
      handlePress={handleSubmit}
      {...otherProps}
    />
  );
}
