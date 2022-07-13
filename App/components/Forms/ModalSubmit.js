import React from "react";
import { useFormikContext } from "formik";
import { TouchableOpacity, Text } from "react-native";

export default function ModalSubmit({ title, style }) {
  const { handleSubmit } = useFormikContext();
  return (
    <TouchableOpacity onPress={handleSubmit}>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
}
