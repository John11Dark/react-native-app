// ? * -->
import React, { useEffect, useState } from "react";
import { FlatList, Image, Keyboard, StyleSheet, Alert } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// ? * -->
import { authApi, errorApi, userApi } from "../../api";
import { useApi, useAuth } from "../../hooks";
import routes from "../../Navigation/routes";
import {
  Screen,
  DataLoadingError,
  ListItem,
  ItemSeparator,
  Icon,
  EditModal,
  Header,
  SearchBar,
} from "../../components";
import { customProps } from "../../config";

// ? * --> Main Stack
export default function UsersScreen() {
  // ? * -->  hooks and states
  const navigation = useNavigation();
  const usersApi = useApi(userApi.getAll);
  const createNewUserApi = useApi(authApi.register);
  const updateUserApi = useApi(userApi.updateUser);
  const isFocused = useIsFocused();
  const { user } = useAuth();

  // ? * --> States
  const [searchItems, setSearchItems] = useState(usersApi.data);
  const [visible, setVisible] = useState(false);
  const [newAccount, setNewAccount] = useState(false);
  const [userData, setUserData] = useState(null);

  // ? * -->  animation and upload
  const [progress, setProgress] = useState();
  const [edit, setEdit] = useState();
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [users, setUsers] = useState(null);

  // ? * -->  Functions

  function createNewUser() {
    showModal(true, null, true, true);
  }

  async function handleSubmitRequest(values, requestType) {
    setVisible(false, null, false, false);
    Keyboard.dismiss();
    try {
      if (requestType === "post") {
        setUploadVisible(true);
        setProgress(0);
        const response = await createNewUserApi.request(
          { ...values },
          (value) => setProgress(value)
        );

        if (!response.ok) {
          setVisible(true, userData, true, true);
          if (response.status >= 500) {
            errorApi.sendError(response.originalError);
            return Alert.alert("s", response.error);
          }
        }
        usersApi.request();
        setDataUploaded(true);
      } else if (requestType === "patch") {
        setUploadVisible(true);
        setProgress(0);
        const response = await updateUserApi.request({ ...values }, (value) =>
          setProgress(value)
        );

        if (!response.ok) {
          setVisible(true, userData, true, false);
          if (response.status >= 500) {
            errorApi.sendError(response.originalError);
            return Alert.alert("s", response.error);
          }
        }
        usersApi.request();
        setDataUploaded(true);
      } else if (requestType === "delete") {
        const response = await userApi.deleteAccount(values);
        if (!response.ok) return Alert.alert("Delete user", response.error);
        Alert.alert("info", "account has been removed!");
        setUsers(users.filter((userList) => userList.id != values));
      }
    } catch (er) {
      console.error(er);
      setUploadVisible(false);
      setDataUploaded(false);
    }
  }

  // ? * --> Effects

  /// *-->//  Set data modal visible
  const showModal = (visible, item, edit, newAccount) => {
    setVisible(visible);
    setUserData(item);
    setEdit(edit);
    setNewAccount(newAccount);
  };

  /// *-->//   Upload animation
  useEffect(() => {
    if (dataUploaded && animationFinish) {
      setAnimationFinish(false);
      setDataUploaded(false);
      setUploadVisible(false);
    }
  }, [dataUploaded, animationFinish]);

  /// *-->//  Request
  useEffect(() => {
    usersApi.request();
    setSearchItems(usersApi.data);
    setUsers(usersApi.data);
  }, [isFocused, users]);

  return (
    <Screen>
      <DataLoadingError
        visible={usersApi.error}
        imageViable={true}
        text="Could not retrieve users from server"
        onPress={() => usersApi.request()}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={usersApi.data}
        keyExtractor={(user) => user._id.toString()}
        renderItem={({ item }) => (
          <>
            <ListItem
              users={true}
              title={item.name === user.name ? "You" : item.name}
              imagePath={item.image[0].url}
              description={item.email}
              style={styles.listItem}
              onPress={() =>
                item.name === user.name
                  ? navigation.navigate(routes.PROFILE)
                  : showModal(true, item, false, false)
              }
            />
          </>
        )}
        ItemSeparatorComponent={ItemSeparator}
        refreshing={usersApi.loading}
        onRefresh={() => usersApi.request()}
        ListHeaderComponent={
          <Header
            goBack
            title="Users"
            SearchBar={<SearchBar visible={false} />}
          />
        }
      />

      {!usersApi.data && (
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../assets/Images/heroImages/authScreen.png")}
        />
      )}

      <Icon
        name={"account-plus"}
        backgroundColor={customProps.secondaryColor}
        iconColor={customProps.barBackgroundColorOpacity}
        innerSize={35}
        size={60}
        onPress={createNewUser}
        style={styles.createNewUserIcon}
      />

      <EditModal
        onClose={() => setVisible(false)}
        title={`Edit Profile`}
        isVisible={visible}
        data={userData}
        reset={edit}
        newAccount={newAccount}
        onDone={handleSubmitRequest}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
  },
  list: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  listItem: {
    container: {
      borderRadius: 0,
      margin: 0,
      backgroundColor: "transparent",
      paddingVertical: 10,
    },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  createNewUserIcon: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
