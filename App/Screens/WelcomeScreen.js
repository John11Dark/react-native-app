import { Image, View } from "react-native";
import { PrimaryButton, SecondaryButton, Screen } from "../components/";

import React from "react";
import { Styles } from "../config";

function WelcomeScreen({ navigation }) {
  return (
    <Screen style={Styles.container}>
      <Image
        resizeMode="contain"
        style={Styles.mainLogo}
        source={require("../assets/Images/heroImages/WelcomeScreen.png")}
      />
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
    </Screen>
  );
}
export default WelcomeScreen;
