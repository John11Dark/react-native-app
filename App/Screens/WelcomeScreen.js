import { Image, SafeAreaView, Text, View } from "react-native";
import { PrimaryButton, SecondaryButton } from "../components/";

import React from "react";
import Styles from "../config/Styles/Styles";

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.containerFlexColumn}>
        <Text style={Styles.primaryText}>Welcome to dolphin pools app!</Text>
        <Image
          resizeMode="contain"
          style={Styles.mainLogo}
          source={require("../assets/Images/MainLogo.png")}
        />
      </View>
      <View style={Styles.containerFlexRow}>
        <PrimaryButton
          title="Login"
          iconName={"login"}
          handlePress={() => navigation.navigate("Login")}
        />
        <SecondaryButton
          title="Register"
          iconName={"file-sign"}
          handlePress={() => navigation.navigate("Register")}
        />
      </View>
    </SafeAreaView>
  );
}
export default WelcomeScreen;
