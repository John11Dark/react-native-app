import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
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
import { Styles } from "../config";
import authApi from "../api/auth";
import { useApi, useAuth, useNotifications } from "../hooks";

const validationSchema = Yup.object().shape({
  image: Yup.array().required().min(1),
  name: Yup.string().required().min(4).label("Full Name"),
  username: Yup.string().required().min(5).label("Username"),
  phoneNumber: Yup.number().required().min(8).label("Phone number"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(12).label("Password"),
});

const RegisterScreen = ({ navigation }) => {
  const { scheduleLocalNotification, schedulePushNotification } =
    useNotifications();

  const registerApi = useApi(authApi.register);
  const [error, setError] = useState(null);
  const auth = useAuth();

  const handleRegistration = async (userInfo, { resetForm }) => {
    const response = await registerApi.request(userInfo);

    if (!response.ok) {
      return setError(response.data.error || "An unexpected error occurred");
    }

    setError(null);
    const { data: AuthToken } = await authApi.login(
      (email = response.data.email),
      (password = response.data.password)
    );
    resetForm();
    auth.login(AuthToken);
    scheduleLocalNotification(
      "Register",
      `Congratulations! 🎊 ${userInfo.name} now you are Registered.`
    );
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading} />
      <Screen>
        <KeyboardAvoidingView keyboardVerticalOffset={25} behavior={"padding"}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              resizeMode="contain"
              style={[Styles.heroImage]}
              source={require("../assets/Images/heroImages/RegisterHeroImage.png")}
            />

            <Text style={Styles.primaryTextHeroSection}>Register</Text>
            <View style={Styles.inputContinuer}>
              <AppForm
                initialValues={{
                  email: "",
                  password: "",
                  username: "",
                  name: "",
                  phoneNumber: "",
                  image: [],
                }}
                onSubmit={handleRegistration}
                validationSchema={validationSchema}
              >
                <FormSingleImageInput name="image" />
                <ErrorMessage error={error} visible={error} />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="account"
                  name="name"
                  placeholder="Full Name"
                  textContentType="name"
                  maxLength={20}
                />
                <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="at"
                  name="username"
                  textContentType="username"
                  placeholder="User Name"
                  maxLength={20}
                />
                <AppFormField
                  autoCapitalize="none"
                  icon="cellphone"
                  autoCorrect={false}
                  keyboardType="numeric"
                  textContentType="telephoneNumber"
                  name="phoneNumber"
                  placeholder="Mobile"
                  returnKeyLabel="done"
                  maxLength={8}
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
                  maxLength={25}
                />

                <SubmitButton title={"Submit"} iconName={"send-circle"} />
              </AppForm>
            </View>

            <View style={Styles.containerFlexRowLinks}>
              <Text style={Styles.secondaryText}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity>
                <Text
                  style={Styles.linkText}
                  onPress={() => navigation.navigate("Login")}
                >
                  {" "}
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
};

export default RegisterScreen;
