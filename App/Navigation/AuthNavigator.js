import {
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
  OTBCodeScreen,
} from "../Screens";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    <Stack.Screen name={routes.FORGOT} component={ForgotPasswordScreen} />
    <Stack.Screen name={routes.OTB_CODE} component={OTBCodeScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
