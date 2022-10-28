import React, { useState } from "react";
import { Image, Text, StyleSheet } from "react-native";

import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
  Wrapper,
  PageNavigator,
} from "../../components";
import { customProps, Styles } from "../../config";
import authApi from "../../api/auth";
import { useApi } from "../../hooks";
import routes from "../../Navigation/routes";

export default function ForgotPasswordScreen({ navigation }) {
  const forgotPasswordApi = useApi(authApi.forgotPassword);
  const [error, setError] = useState(null);

  const handleRequest = async (phoneNumber) => {
    const response = await forgotPasswordApi.request(phoneNumber);

    if (!response.ok) console.log(response.data);
    // return setError(
    //   response.data.error ||
    //     response.data.message ||
    //     "unexpected error occurred"
    // );

    setError(null);
    navigation.navigate("OTBCodeScreen");
  };

  return (
    <Wrapper activateIndicator={forgotPasswordApi.loading}>
      <Image
        resizeMode="contain"
        style={[Styles.heroImage]}
        source={require("../../assets/Images/heroImages/LoginHeroImage.png")}
      />

      <Text style={styles.title}>Forgot password ? 🤔</Text>
      <Text style={styles.text} numberOfLines={5}>
        No worries enter your phone number. Then you will receive SMS message to
        change your password
      </Text>
      <AppForm
        initialValues={{
          phoneNumber: "",
        }}
        onSubmit={handleRequest}
        schema="forgetPassword"
      >
        <ErrorMessage error={error} visible={error} />
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
          title="Phone Number"
          handleSubmitProp
        />

        <SubmitButton marginTop={30} title={"Send"} iconName={"send"} />
        <PageNavigator
          label={"Go back to"}
          linkLabel={"Login?"}
          screen={routes.LOGIN}
          style={{ alignSelf: "center", marginTop: 150 }}
        />
      </AppForm>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    fontWeight: "900",
    fontSize: 30,
    paddingHorizontal: 10,
  },

  text: {
    ...customProps.font,
    fontSize: 20,
    color: customProps.primaryColorLightGray,
    fontWeight: "300",
    padding: 10,
  },
});
