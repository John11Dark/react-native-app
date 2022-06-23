import React from "react";
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
import customStyles from "../config/Styles/Styles";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().min(3).label("User Name"),
});

export default function OTBCodeScreen({ navigation }) {
  return (
    <>
      <ActivityIndicator visible={false} />
      <Screen>
        <Image
          resizeMode="contain"
          style={[customStyles.heroImage, { marginVertical: 15 }]}
          source={require("../assets/Images/heroImages/OTBHeroImage.png")}
        />

        <Text style={customStyles.secondaryTextHeroSection}>
          Enter your OTB code!
        </Text>
        <View style={customStyles.secondaryContainerPadding}>
          <Text style={customStyles.secondaryText}>
            Haven't receive the code yet ?
          </Text>
          <TouchableOpacity>
            <Text style={customStyles.linkText}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        <AppForm
          initialValues={{
            userName: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <View style={[customStyles.inputContinuer, { marginVertical: 20 }]}>
            <AppFormField
              icon="dialpad"
              name="OTBCode"
              textContentType="oneTimeCode"
              placeholder="0  0  0  0  0  0"
              maxLength={6}
              textAlign={"center"}
              keyboardType="phone-pad"
            />
          </View>

          <SubmitButton title={"Verify"} iconName={"update"} />
        </AppForm>

        <View style={customStyles.containerFlexRowLinksAbsolute}>
          <Text style={customStyles.secondaryText}>Go back to login page </Text>
          <TouchableOpacity>
            <Text
              style={customStyles.linkText}
              onPress={() => navigation.navigate("Login")}
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
