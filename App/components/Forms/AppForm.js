import { Formik } from "formik";
import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

export default function AppForm({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  schema,
  ...otherProps
}) {
  // ? * --> variables
  const registerSchema = Yup.object().shape({
    image: Yup.array().required().min(1),
    name: Yup.string().required().min(4).label("Full Name"),
    username: Yup.string().required().min(5).label("Username"),
    phoneNumber: Yup.number().required().min(8).label("Phone number"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(12).label("Password"),
  });
  const loginSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password"),
  });

  const forgetPasswordSchema = Yup.object().shape({
    username: Yup.string().required().min(3).label("User Name"),
  });

  if (schema?.toLowerCase() === "register") {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
        {...otherProps}
      >
        {() => <View style={styles.container}>{children}</View>}
      </Formik>
    );
  } else if (schema?.toLowerCase() === "login") {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        {...otherProps}
      >
        {() => <View style={styles.container}>{children}</View>}
      </Formik>
    );
  } else if (schema?.toLowerCase() === "forgetPassword") {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={forgetPasswordSchema}
        {...otherProps}
      >
        {() => <View style={styles.container}>{children}</View>}
      </Formik>
    );
  } else {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        {...otherProps}
      >
        {() => <View style={styles.container}>{children}</View>}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 30,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 35,
  },
});
