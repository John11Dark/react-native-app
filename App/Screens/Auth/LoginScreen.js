// ? * -->  Third parties dependencies
import { Image, Text } from "react-native";
import React, { useState } from "react";

// ? * -->  Custom dependencies
import { useApi, useAuth } from "../../hooks";
import authApi from "../../api/auth";
import { Styles } from "../../config";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
  Wrapper,
  PageNavigator,
} from "../../components";
import routes from "../../Navigation/routes";

// ? * -->  mainStack

export default function LoginScreen() {
  // ? * --> Hooks
  const loginApi = useApi(authApi.login);
  const auth = useAuth();

  // ? * -->  States
  const [loginError, setLoginError] = useState(null);

  // ? * --> Functions
  const handleLogin = async ({ email, password }, { resetForm }) => {
    const response = await loginApi.request(email, password);

    if (!response.ok) {
      return setLoginError(
        response.data
          ? response.data.error
          : "unexpected error occurred please try again later"
      );
    }
    resetForm();
    setLoginError(null);
    auth.login(response.data);
  };

  return (
    <Wrapper activateIndicator={loginApi.loading}>
      <Image
        resizeMode="contain"
        style={[Styles.heroImageVertical]}
        source={require("../../assets/Images/heroImages/authScreen.png")}
      />
      <Text style={Styles.primaryTextHeroSection}>Login</Text>

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        schema={"login"}
      >
        <ErrorMessage error={loginError} visible={loginError} />
        <AppFormField
          icon="email"
          keyBoardType="email-address"
          name="email"
          textContentType="emailAddress"
          placeholder="Email"
          autoComplete="email"
        />
        <AppFormField
          icon="lock"
          name="password"
          secureTextEntry
          textContentType="password"
          placeholder="Password"
          handleSubmitProp
        />
        <PageNavigator linkLabel={"forget password?"} screen={routes.FORGOT} />
        <SubmitButton title={"Login"} iconName={"login-variant"} />
        <PageNavigator
          label={"Do not have an account?"}
          linkLabel={"Register"}
          screen={routes.REGISTER}
          style={{ alignSelf: "center", marginTop: 30 }}
        />
      </AppForm>
    </Wrapper>
  );
}
