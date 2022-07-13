import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  ActivityIndicator,
  ErrorMessage,
  Screen,
} from "../components";
import { Styles } from "../config";
import authApi from "../api/auth";
import { useApi } from "../hooks";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(3).label("User Name"),
});

export default function ForgotPasswordScreen({ navigation }) {
  const forgotPasswordApi = useApi(authApi.forgotPassword);
  const [error, setError] = useState(null);

  const handleRequest = async (username) => {
    const response = await forgotPasswordApi.request(username);

    if (!response.ok)
      return setError(response.data.error || "unexpected error occurred");

    setError(null);
    navigation.navigate("OTBCodeScreen");
  };

  return (
    <>
      <ActivityIndicator visible={forgotPasswordApi.loading} />
      <Screen>
        <Image
          resizeMode="contain"
          style={[Styles.heroImage]}
          source={require("../assets/Images/heroImages/LoginHeroImage.png")}
        />

        <Text style={Styles.secondaryTextHeroSection}>Forgot password?</Text>
        <Text style={Styles.secondaryTextGray} numberOfLines={5}>
          Forgot your password no worries Enter your user name and you will
          receive OTP code on your email and phone number
        </Text>
        <AppForm
          initialValues={{
            username: "",
          }}
          onSubmit={handleRequest}
          validationSchema={validationSchema}
        >
          <View style={[Styles.inputContinuer, { marginVertical: 20 }]}>
            <ErrorMessage error={error} visible={error} />
            <AppFormField
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect={false}
              icon="at"
              name="username"
              textContentType="username"
              placeholder="User Name"
            />
          </View>

          <SubmitButton title={"Send"} iconName={"send"} />
        </AppForm>

        <View style={Styles.containerFlexRowLinksAbsolute}>
          <Text style={Styles.secondaryText}>Go back to login page </Text>
          <TouchableOpacity>
            <Text
              style={Styles.linkText}
              onPress={() => navigation.navigate("OTBCode")}
            >
              {" "}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </Screen>
    </>
  );
}
