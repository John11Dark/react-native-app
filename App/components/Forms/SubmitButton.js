import PrimaryButton from "../Buttons/PrimaryButton";
import React from "react";
import { useFormikContext } from "formik";

export default function SubmitButton({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <PrimaryButton title={title} handlePress={handleSubmit} {...otherProps} />
  );
}
