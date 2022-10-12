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
  FormSingleImageInput,
  Wrapper,
  DateTimePicker,
  CheckBox,
  Header,
} from "../components";
import { customProps, Styles } from "../config";
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
  const auth = useAuth();

  const [error, setError] = useState(null);
  const [gender, setGender] = useState(true);

  const handleRegistration = async (userInfo, { resetForm }) => {
    const response = await registerApi.request(userInfo);

    if (!response.ok) {
      return setError(response.data.message || "An unexpected error occurred");
    }

    setError(null);
    const email = response.data.email;
    const password = response.data.password;
    const { data: AuthToken } = await authApi.login(email, password);
    console.log(AuthToken);
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
      <Wrapper>
        <Header
          goBack
          title="Register"
          subTitle="Welcome to Dolphin Pools App"
        />
        <View style={Styles.inputContinuer}>
          <AppForm
            initialValues={{
              email: "",
              password: "",
              username: "",
              name: "",
              phoneNumber: "",
              image: [],
              gender: true,
              dateOfBirth: new Date().toDateString(),
            }}
            onSubmit={handleRegistration}
            validationSchema={validationSchema}
          >
            <FormSingleImageInput name="image" />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Full Name"
              textContentType="name"
              maxLength={20}
              title={"Full name"}
            />

            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="at"
              name="username"
              textContentType="username"
              placeholder="User Name"
              maxLength={20}
              title="User Name"
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
              title="Phone Number"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              name="email"
              placeholder="Email"
              title="Email"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock-open-variant"
              name="password"
              textContentType="password"
              placeholder="Password"
              maxLength={25}
              title="Password"
            />
            <CheckBox
              name="gender"
              placeholder="Gender"
              choiceOne="Male"
              choiceTwo="Female"
              onPress={(value) => setGender(value)}
              selected={gender}
            />
            <DateTimePicker title="Date Of Birth" name="dateOfBirth" />
            <ErrorMessage error={error} visible={error} />
            <SubmitButton
              title={"Submit"}
              iconName={"send-circle"}
              marginTop={30}
            />
          </AppForm>
        </View>

        <View style={Styles.containerFlexRowLinks}>
          <Text style={Styles.secondaryText}>Already have an account? </Text>
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
      </Wrapper>
    </>
  );
};

export default RegisterScreen;
