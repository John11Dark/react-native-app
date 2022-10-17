import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

import {
  ActivityIndicator,
  ErrorMessage,
  Screen,
  PrimaryButton,
} from "../../components";
import customStyles from "../../config/Styles/Styles";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(3).label("User Name"),
});

export default function OTBCodeScreen({ navigation }) {
  let textInput = useRef(null);
  const lengthInput = 6;
  const [textValue, setTextValue] = useState("0");
  const onChangeText = (value) => {
    setTextValue(value);
  };

  useEffect(() => {
    textInput.focus();
  }, []);
  return (
    <>
      <ActivityIndicator visible={false} />
      <Screen>
        <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={"position"}>
          <Image
            resizeMode="contain"
            style={[customStyles.heroImage, { marginVertical: 15 }]}
            source={require("../../assets/Images/heroImages/OTBHeroImage.png")}
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
          <View style={customStyles.OTBInputContinuer}>
            <TextInput
              ref={(input) => (textInput = input)}
              onChangeText={onChangeText}
              style={{ width: 0, height: 0, display: "none" }}
              value={textValue}
              maxLength={lengthInput}
              returnKeyType="done"
              keyboardType="phone-pad"
              textContentType="oneTimeCode"
            />
            <View style={customStyles.OTBTextInputContinuer}>
              {Array(lengthInput)
                .fill()
                .map((_, index) => (
                  <View
                    key={index}
                    style={{
                      marginBottom: index === textValue.length ? 5 : 0,
                    }}
                  >
                    <Text
                      style={customStyles.textInputOTB}
                      onPress={() => textInput.focus()}
                    >
                      {textValue && textValue.length > 0
                        ? textValue[index]
                        : "0"}
                    </Text>
                  </View>
                ))}
            </View>
          </View>

          <PrimaryButton title={"Verify"} iconName={"update"} />
        </KeyboardAvoidingView>
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
