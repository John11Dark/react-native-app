import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import * as Yup from "yup";

import messagesApi from "../api/messages";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ListItem,
  CustomText,
} from "../components";
import { useNotifications } from "../hooks";
import customProps from "../config/customProps";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

const ListingDetails = ({ route }) => {
  const { _id, images, title, price } = route.params;

  const { scheduleLocalNotification } = useNotifications();

  const handleMessageSubmit = async ({ message }, { resetForm }) => {
    try {
      Keyboard.dismiss();

      const result = await messagesApi.sendMessage({
        message,
        listingId: _id,
      });
      if (!result.ok) throw result.originalError;

      scheduleLocalNotification("Info", "Message sent");

      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
    >
      <View style={styles.container}>
        <Image
          preview={{ uri: images[0].thumbnail }}
          style={styles.image}
          tint={"light"}
          uri={images[0].url}
        />
        <View style={styles.detailsContainer}>
          <CustomText style={styles.title}>{title}</CustomText>
          <CustomText style={styles.price}>{price}</CustomText>
        </View>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Mosh Hamedani"
            description="5 listings"
          />
        </View>
        <View style={styles.form}>
          <AppForm
            initialValues={{ message: "" }}
            onSubmit={handleMessageSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField name="message" placeholder="Message..." />
            <SubmitButton title="Contact Seller" />
          </AppForm>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {},
  detailsContainer: {
    padding: 15,
  },
  form: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 280,
  },
  price: {
    color: customProps.secondaryColor,
    fontSize: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 6,
  },
  userContainer: {
    marginTop: 5,
  },
});

export default ListingDetails;
