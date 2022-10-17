import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import * as Yup from "yup";
import {
  ActivityIndicator,
  AppForm,
  FormSingleImageInput,
  ErrorMessage,
  SubmitButton,
  EditFiled,
  Wrapper,
  Header,
} from "../../components";
import { customProps, Styles } from "../../config";
import { useAuth, useApi } from "../../hooks";
import { userApi, authApi } from "../../api";
import Routes from "../../Navigation/routes";

export default function ProfileScreen({ navigation }) {
  // state and hooks
  const { user, logout } = useAuth();
  const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState(null);

  // validation schema
  const validationSchema = Yup.object().shape({
    image: Yup.array().required().min(1).max(1),
    name: Yup.string().required().min(2).label("Full Name"),
    username: Yup.string().required().min(3).label("Username"),
    phoneNumber: Yup.number().required().min(8).label("phone number"),
    email: Yup.string().required().email().label("Email"),
  });

  // functions **

  // handle edit values
  const handleEdit = async () => {
    if (edit)
      Alert.alert(
        "Modify Profile",
        "Make sure that you save the changes before you leave this page"
      );
    setEdit(!edit);
    navigation.setOptions({ headerShown: edit });
  };

  // handle update on the backend
  const handleUpdate = async (values) => {
    updateUserApi.request(values);
  };

  // handle delete on the server
  const deleteAccount = async (accountId) => {
    Alert.alert(
      "Delete account",
      `if you delete your account all your data will be erased from the server and you wont be able to access to the app with this account.
      also your lists will be moved to the recycle bin and will be erased after 5 days if the admin did not restore them\n
      are you sure you want to proceed?`,
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            const response = await userApi.deleteAccount(accountId);
            if (!response.ok)
              return setError(
                response.error
                  ? response.error
                  : "an error occur on the server please try again later..!"
              );

            if (response.ok)
              return Alert.alert(
                "info",
                "your account has been removed and will logout after you press ok",
                [
                  {
                    text: "ok",
                    onPress: () =>
                      accountId === user.userId
                        ? logout()
                        : console.log("first", accountId),
                  },
                ]
              );
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const updatePassword = () => {
    setChangePassword(!changePassword);
    if (changePassword) {
      validationSchema.oldPassword = Yup.string()
        .required()
        .min(12)
        .max(25)
        .label("Old password");
      validationSchema.newPassword = Yup.string()
        .required()
        .min(12)
        .max(25)
        .label("New password");
    }
  };

  const updateUserApi = useApi(userApi.updateUser);
  const [edit, setEdit] = useState(false);
  return (
    <Wrapper scrollBarVisible={false}>
      <ActivityIndicator visible={updateUserApi.loading} />
      {/* <Header goBack title="My Profile" /> */}
      <AppForm
        initialValues={{
          email: user.email,
          id: user.userId,
          image: [user.image[0].url],
          name: user.name,
          username: user.username,
          phoneNumber: user.phoneNumber,
          newPassword: null,
          oldPassword: null,
        }}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
      >
        <FormSingleImageInput
          editable={edit}
          name="image"
          style={styles.image}
        />
        <ErrorMessage error={error} visible={error} />
        <View style={Styles.inputContinuer}>
          <EditFiled
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Full Name"
            textContentType="name"
            onPress={handleEdit}
            edit={edit}
          />
          <EditFiled
            autoCapitalize="none"
            autoCorrect={false}
            icon="at"
            name="username"
            textContentType="username"
            placeholder="User Name"
            onPress={handleEdit}
            edit={edit}
          />
          <EditFiled
            autoCapitalize="none"
            icon="cellphone"
            autoCorrect={false}
            keyboardType="numeric"
            textContentType="telephoneNumber"
            name="phoneNumber"
            maxLength={8}
            placeholder="Mobile"
            returnKeyType="next"
            onPress={handleEdit}
            edit={edit}
          />
          <EditFiled
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            name="email"
            placeholder="Email"
            onPress={handleEdit}
            edit={edit}
          />
          <EditFiled
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock-open-variant"
            name="oldPassword"
            placeholder="Old password"
            maxLength={25}
            onPress={handleEdit}
            edit={edit}
            style={{ display: changePassword ? "flex" : "none" }}
          />
          <EditFiled
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock-open-variant"
            textContentType="newPassword"
            name="email"
            placeholder="Email"
            onPress={handleEdit}
            maxLength={25}
            edit={edit}
            style={{ display: changePassword ? "flex" : "none" }}
          />

          <SubmitButton
            title="Save"
            visible={edit}
            iconName="content-save-check"
          />
        </View>
      </AppForm>
      <TouchableOpacity
        onPress={updatePassword}
        style={[styles.buttons, { display: edit ? "flex" : "none" }]}
      >
        <Text style={[Styles.linkText]}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleteAccount(user.userId);
        }}
        style={styles.buttons}
      >
        <Text
          style={[
            Styles.linkText,
            { color: customProps.importantIconColor, marginBottom: 30 },
          ]}
        >
          Delete Account
        </Text>
      </TouchableOpacity>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 15,
    backgroundColor: customProps.darkCardBackgroundColor,
    borderRadius: 25,
    overflow: "hidden",
    flex: 1.5,
    paddingVertical: 15,
    transform: [{ translateY: 50 }],
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 0,
    margin: 0,
    marginLeft: 0,
    padding: 0,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});
