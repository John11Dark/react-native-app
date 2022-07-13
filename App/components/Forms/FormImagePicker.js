import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../Lists/ImageInputList";
import React from "react";
import { useFormikContext } from "formik";

export default function FormImagePicker({ name, maxLength }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const uris = values[name];

  const handleAdd = (uri) => setFieldValue(name, [...uris, uri]);

  const handleRemove = (uri) =>
    setFieldValue(
      name,
      uris.filter((imageUri) => imageUri !== uri)
    );

  return (
    <>
      <ImageInputList
        onImageAdd={handleAdd}
        onImageRemove={handleRemove}
        uris={uris}
        maxLength={maxLength}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
