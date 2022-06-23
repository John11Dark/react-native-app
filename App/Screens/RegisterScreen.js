import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  ActivityIndicator,
  ErrorMessage,
  Screen,
  FormSingleImageInput,
} from "../components";
import customStyles from "../config/Styles/Styles";
import authApi from "../api/auth";
import { useApi, useAuth } from "../hooks";

const validationSchema = Yup.object().shape({
  images: Yup.array().required().min(1).max(1),
  name: Yup.string().required().min(2).label("Full Name"),
  userName: Yup.string().required().min(3).label("User Name"),
  phoneNumber: Yup.number().required().min(8).max(11).label("phone number"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(12).label("Password"),
});

const RegisterScreen = ({ navigation }) => {
  const registerApi = useApi(authApi.register);
  const [error, setError] = useState(null);
  const auth = useAuth();

  const handleRegistration = async (userInfo, { resetForm }) => {
    const response = await registerApi.request(userInfo);

    if (!response.ok) {
      return setError(response.data.error || "An unexpected error occurred");
    }

    setError(null);
    resetForm();
    auth.login(response.data);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            resizeMode="contain"
            style={[customStyles.heroImage]}
            source={require("../assets/Images/heroImages/RegisterHeroImage.png")}
          />

          <Text style={customStyles.primaryTextHeroSection}>Register</Text>
          <View style={customStyles.inputContinuer}>
            <AppForm
              initialValues={{
                email: "",
                password: "",
                userName: "",
                name: "",
                phoneNumber: "",
                images: [],
              }}
              onSubmit={handleRegistration}
              //validationSchema={validationSchema}
            >
              <FormSingleImageInput name="images" />
              <ErrorMessage error={error} visible={error} />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="account"
                name="name"
                placeholder="Full Name"
                textContentType="name"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="at"
                name="userName"
                textContentType="username"
                placeholder="User Name"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="cellphone"
                keyboardType="numeric"
                textContentType="telephoneNumber"
                name="phoneNumber"
                placeholder="Mobile"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                name="email"
                placeholder="Email"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock-open-variant"
                name="password"
                textContentType="password"
                placeholder="Password"
              />

              <SubmitButton title={"Submit"} iconName={"send-circle"} />
            </AppForm>
          </View>

          <View style={customStyles.containerFlexRowLinks}>
            <Text style={customStyles.secondaryText}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity>
              <Text
                style={customStyles.linkText}
                onPress={() => navigation.navigate("Login")}
              >
                {" "}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    </>
  );
};

export default RegisterScreen;
