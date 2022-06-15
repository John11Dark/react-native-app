import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../components";
import React from "react";

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <View>
      <Text>ForgotPasswordScreen</Text>
      <PrimaryButton
        title={"login"}
        handlePress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
