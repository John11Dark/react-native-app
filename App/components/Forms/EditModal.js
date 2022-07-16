// Third Parties Libraries
import {
  View,
  Modal,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

// custom Libraries
import { customProps, settings } from "../../config";
import Screen from "../Screen";
import EditFiled from "./EditFiled";
import AppForm from "./AppForm";
import ModalSubmit from "./ModalSubmit";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function EditModal({
  data = true,
  onDone,
  isVisible,
  onClose,
  title,
  reset,
  newAccount,
}) {
  const assetsUrl = settings.assetsUrl;

  // user input validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required().min(4).max(20).label("Full Name"),
    username: Yup.string().required().min(5).max(20).label("Username"),
    phoneNumber: Yup.number()
      .typeError("Phone Number can only contain numbers!..")
      .required()
      .min(8)
      .label("Phone number"),
    email: Yup.string().required().email().label("Email"),
  });

  // function that determents that data for new user or an existing user
  const setInitialValues = (data) => {
    const newData = {
      email: "",
      name: "",
      username: "",
      phoneNumber: "",
      password: "0123456789_MT",
      image: [`${assetsUrl}maleAvatar_full.jpg`],
      requestTypeApi: "post",
    };
    if (data) {
      newData.email = data.email;
      newData.name = data.name;
      newData.username = data.username;
      newData.phoneNumber = data.phoneNumber;
      newData.id = data.id;
      newData.image[0] = data.images[0].url
        ? data.images[0].url
        : `${assetsUrl}maleAvatar_full.jpg`;
      newData.password = "";
      newData.requestTypeApi = "patch";
    }
    return newData;
  };

  // set initial values for the form
  const initialValues = setInitialValues(data);

  // states
  // role type state

  const [role, setRole] = useState(data != undefined ? data.role : "User");

  // handling edit press
  const [edit, setEdit] = useState();
  const handleEdit = () => {
    if (edit)
      Alert.alert(
        "Modify Profile",
        "Make sure to press done to commit all changes to the server"
      );
    setEdit(!edit);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      "after deleting this account all data acscited with this account will be permanently deleted.",
      [
        {
          text: "I understand",
          style: "destructive",
          onPress: () =>
            Alert.alert("Delete Account", "are you sure you want to continue", [
              {
                text: "Yes",
                style: "destructive",
                onPress: () => onDone(initialValues.id, "delete"),
              },
              {
                text: "cancel",
                style: "cancel",
              },
            ]),
        },
      ]
    );
  };

  const passwordEdit = () => {
    Alert.alert(
      "Password",
      "you can not modify password.\nthe user will be asked to updated when the login at the first time",
      [
        {
          text: "i understand",
          onPress: () =>
            Alert.alert("Authentication info", "Copy email and password", [
              {
                text: "yes",
                onPress: () =>
                  console.log(initialValues.password, initialValues.email),
              },
              { text: "No" },
            ]),
        },
      ]
    );
  };
  useEffect(() => {
    setEdit(reset);
    console.log(edit);
  }, [reset]);
  return (
    <Modal visible={isVisible} animationType="slide">
      <Screen>
        <AppForm
          initialValues={initialValues}
          onSubmit={(values) =>
            onDone({ ...values, role: role }, values.requestTypeApi)
          }
          validationSchema={validationSchema}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text
                style={[
                  styles.buttonText,
                  { color: customProps.importantIconColor },
                ]}
              >
                Close
              </Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <ModalSubmit
              style={[styles.buttonText, { fontWeight: "700" }]}
              title={"done"}
            />
          </View>
          <View>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={120}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        "info",
                        "you can not add an image for a user\nwhen the user login can modify their image"
                      )
                    }
                  >
                    <Image
                      style={{
                        width: 300,
                        height: 300,
                        borderRadius: 150,
                        alignSelf: "center",
                      }}
                      source={{ uri: initialValues.image[0] }}
                    />
                  </TouchableOpacity>

                  <EditFiled
                    icon={"account"}
                    name="name"
                    placeholder="Full Name"
                    edit={edit}
                    onPress={handleEdit}
                    maxLength={20}
                    editBtnVisible={newAccount ? false : true}
                  />
                  <EditFiled
                    icon={"account"}
                    name="username"
                    placeholder="Username"
                    edit={edit}
                    editBtnVisible={newAccount ? false : true}
                    onPress={handleEdit}
                    maxLength={20}
                  />
                  <EditFiled
                    icon={"email"}
                    name="email"
                    placeholder="Email"
                    edit={edit}
                    editBtnVisible={newAccount ? false : true}
                    onPress={handleEdit}
                  />
                  <EditFiled
                    icon={"cellphone"}
                    name="phoneNumber"
                    placeholder="Phone number"
                    edit={edit}
                    editBtnVisible={newAccount ? false : true}
                    onPress={handleEdit}
                    keyboardType={"numeric"}
                    maxLength={8}
                  />
                  <EditFiled
                    icon={"lock"}
                    name="password"
                    placeholder="password"
                    edit={false}
                    editBtnVisible={newAccount}
                    onPress={passwordEdit}
                    style={{ display: newAccount ? "flex" : "none" }}
                  />
                  <EditFiled
                    icon={"microsoft-office"}
                    name="role"
                    value={role}
                    placeholder="Privileges"
                    editBtnVisible
                    onPress={() => {
                      Alert.alert(
                        "Users Privileges",
                        "user role \n can only create lists and modify their own lists and profile \n Admin role can Modify any list can view all lists can remove and add create users",
                        [
                          {
                            text: "Admin",
                            onPress: () => {
                              setRole("Admin");
                            },
                          },
                          {
                            text: "User",
                            onPress: () => {
                              setRole("User");
                            },
                          },
                        ]
                      );
                    }}
                  />
                  <TouchableOpacity onPress={handleDelete}>
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          margin: 10,
                          color: customProps.importantIconColor,
                          fontSize: 27,
                          alignSelf: "center",
                          display: !newAccount ? "flex" : "none",
                          fontWeight: "700",
                        },
                      ]}
                    >
                      Delete Account
                    </Text>
                  </TouchableOpacity>
                </View>
                <Image
                  resizeMode="contain"
                  source={require("../../assets/Images/heroImages/Details.png")}
                  style={{
                    width: "90%",
                    height: 300,
                    alignSelf: "center",
                    marginBottom: 10,
                  }}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </AppForm>
      </Screen>
    </Modal>
    /**
     * Brief description of the function here.
     * @summary If the description is long, write your summary here. Otherwise, feel free to remove this.
     * @param {Object} data - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @param {String} title - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @param {Boolean} isVisible - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @param {Function} onDone - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @param {Function} onClose - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @param {} isVisible
     *  - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @param {ParamDataTypeHere} parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @example  - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
     * @return {FunctionComponent} Brief description of the returning value here.
     */
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "95%",
    flexDirection: "row",
    backgroundColor: customProps.primaryColorDark,
    zIndex: 5,
  },
  contentContainer: {
    alignSelf: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 20,
  },
  title: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    fontWeight: "600",
  },
  buttonText: {
    ...customProps.font,
    fontSize: 20,
    color: customProps.TertiaryColor,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  textInput: {
    width: "80%",
    maxWidth: 350,
    alignSelf: "center",
    borderRadius: 15,
    top: -200,
    fontSize: 30,
    color: customProps.primaryColorLight,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: customProps.secondaryColor,
  },
});
