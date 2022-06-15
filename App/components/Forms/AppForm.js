import { Formik } from "formik";
import React from "react";

export default function AppForm({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  ...otherProps
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      {...otherProps}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
