import * as Yup from "yup";

import { AppForm, AppFormField, Screen, SubmitButton } from "../components";
import { Image, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import customStyles from "../config/Styles/Styles";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(12).label("Password"),
});

export default function LoginScreen({ navigation }) {
  return (
    <Screen>
      <Image
        resizeMode="contain"
        style={[customStyles.heroImage]}
        source={require("../assets/Images/heroImages/LoginHeroImage.png")}
      />
      <Text style={customStyles.primaryTextHeroSection}>Login</Text>

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <View style={customStyles.inputContinuer}>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyBoardType="email-address"
            name="email"
            textContentType="emailAddress"
            placeholder="Email"
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
    </Screen>
  );
}
