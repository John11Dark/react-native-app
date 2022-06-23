// third parties libraries
import * as Yup from "yup";
import { Image, Text, TouchableOpacity, View, ScrollView } from "react-native";
import React, { useState } from "react";

// application libraries
import { useApi, useAuth } from "../hooks";
import authApi from "../api/auth";
import customStyles from "../config/Styles/Styles";
import {
  AppForm,
  AppFormField,
  Screen,
  SubmitButton,
  ErrorMessage,
  ActivityIndicator,
} from "../components";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen({ navigation }) {
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async ({ email, password }, { resetForm }) => {
    const response = await loginApi.request(email, password);

    if (!response.ok) {
      const errorMessage = response.data.error
        ? response.data.error
        : "unexpected error occurred please try again later";
      return setLoginError(errorMessage);
    }
    resetForm();
    setLoginError(null);
    auth.login(response.data);
  };
  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            resizeMode="contain"
            style={[customStyles.heroImageVertical]}
            source={require("../assets/Images/heroImages/authScreen.png")}
          />
          <Text style={customStyles.primaryTextHeroSection}>Login</Text>

          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}
          >
            <View style={customStyles.inputContinuer}>
              <ErrorMessage error={loginError} visible={loginError} />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyBoardType="email-address"
                name="email"
                textContentType="emailAddress"
                placeholder="Email"
                autoComplete="email"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                secureTextEntry
                textContentType="password"
                placeholder="Password"
              />
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={[customStyles.linkText, customStyles.linkTextPrimary]}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  forgot password?
                </Text>
              </TouchableOpacity>
              <SubmitButton title={"Login"} iconName={"login-variant"} />
            </View>
          </AppForm>
          <View style={customStyles.containerFlexRowLinks}>
            <Text style={customStyles.secondaryText}>new user? </Text>
            <TouchableOpacity>
              <Text
                style={customStyles.linkText}
                onPress={() => navigation.navigate("Register")}
              >
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Screen>
    </>
  );
}
