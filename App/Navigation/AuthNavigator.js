import {
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  WelcomeScreen,
} from "../Screens";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "./routes";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    <Stack.Screen name={routes.FORGOT} component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
