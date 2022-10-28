// ? * --> third parties dependencies
import React, { useState } from "react";

// ? * --> custom dependencies
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
  FormSingleImageInput,
  Wrapper,
  DateTimePicker,
  CheckBox,
  Header,
  PageNavigator,
} from "../../components";
import authApi from "../../api/auth";
import { useApi, useAuth } from "../../hooks";
import routes from "../../Navigation/routes";

// ? * --> main stack
export default function RegisterScreen() {
  // ? * --> hooks
  const registerApi = useApi(authApi.register);
  const auth = useAuth();

  // ? * --> states
  const [error, setError] = useState(null);
  const [gender, setGender] = useState(true);

  // ? * --> functions
  const handleRegistration = async (userInfo, { resetForm }) => {
    const response = await registerApi.request(userInfo);

    if (!response.ok) {
      return setError(
        response.data.error ||
          response.data.message ||
          "An unexpected error occurred"
      );
    }

    setError(null);
    const email = response.data.email;
    const password = response.data.password;
    const { data: AuthToken } = await authApi.login(email, password);
    resetForm();
    auth.login(AuthToken);
    // TODO: notify
  };

  return (
    <Wrapper activateIndicator={registerApi.loading}>
      <Header goBack title="Register" subTitle="Welcome to Dolphin Pools App" />
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
        schema="register"
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
          placeholder="Username"
          maxLength={20}
          title="Username"
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
      <PageNavigator
        label={"Already have an account?"}
        linkLabel={"Login"}
        screen={routes.LOGIN}
        style={{ alignSelf: "center", marginTop: 0 }}
      />
    </Wrapper>
  );
}
