import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { authApi, errorApi, userApi } from "../api";
import { useApi, useAuth } from "../hooks";
import routes from "../Navigation/routes";
import {
  Screen,
  DataLoadingError,
  ListItem,
  ItemSeparator,
  SearchBar,
  Icon,
  EditModal,
  UploadIndicator,
  Header,
} from "../components";
import { customProps, settings } from "../config";

export default function UsersScreen() {
  const assetsUrl = settings.assetsUrl;
  // hooks and states
  const navigation = useNavigation();
  const usersApi = useApi(userApi.getAll);
  const createNewUserApi = useApi(authApi.register);
  const updateUserApi = useApi(userApi.updateUser);
  const [searchItems, setSearchItems] = useState(usersApi.data);
  const [visible, setVisible] = useState(false);
  const [newAccount, setNewAccount] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useAuth();
  const isFocused = useIsFocused();

  // animation and upload
  const [progress, setProgress] = useState();
  const [edit, setEdit] = useState();
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [users, setUsers] = useState(null);

  // Functions

  const createNewUser = () => {
    showModal(true, null, true, true);
  };

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
      console.log(er);
      setUploadVisible(false);
      setDataUploaded(false);
    }
  }

  //_* Set data modal visible
  const showModal = (visible, item, edit, newAccount) => {
    setVisible(visible);
    setUserData(item);
    setEdit(edit);
    setNewAccount(newAccount);
  };

  //_* Filter Users search
  const filterUsers = (value) => {
    value = value.toString().toLowerCase();
    if (searchItems.length === 0 || searchItems == undefined) {
      if (usersApi.data.length === 0) request();
      setSearchItems(usersApi.data);
    }
    if (value.length != 0) {
      console.log(value);
      setSearchItems(
        searchItems.filter(
          (user) =>
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        )
      );
    } else {
      setSearchItems(usersApi.data);
    }
  };
  // effect hooks

  //_*upload animation
  useEffect(() => {
    if (dataUploaded && animationFinish) {
      setAnimationFinish(false);
      setDataUploaded(false);
      setUploadVisible(false);
    }
  }, [dataUploaded, animationFinish]);

  //_* request
  useEffect(() => {
    usersApi.request();
    setSearchItems(usersApi.data);
    setUsers(usersApi.data);
  }, [isFocused, users]);

  console.log(`${assetsUrl}maleAvatar_full.jpg`);
  console.log(usersApi.data[0]);
  return (
    <Screen>
      <Header
        searchBar
        IconComponent={
          <Icon
            name={"account-plus"}
            backgroundColor={"transparent"}
            iconColor={customProps.secondaryColor}
            innerSize={35}
            onPress={createNewUser}
          />
        }
      />
      <View style={{ zIndex: 5 }}>
        <UploadIndicator
          progress={progress}
          visible={uploadVisible}
          onFinish={() => {
            setAnimationFinish(true);
          }}
        />
      </View>
      <DataLoadingError
        visible={usersApi.error}
        imageViable={true}
        text="Could not retrieve users from server"
        onPress={() => usersApi.request()}
      />

      {searchItems ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={usersApi.data}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <>
              <ListItem
                users={true}
                title={item.name === user.name ? "You" : item.name}
                description={item.email}
                subTitle={item.role}
                style={styles.listItem}
                onPress={() =>
                  item.name === user.name
                    ? navigation.navigate(routes.PROFILE)
                    : showModal(true, item, false, false)
                }
                imagePath={
                  item.images[0].url
                    ? item.images[0].url
                    : `${assetsUrl}maleAvatar_full.jpg`
                }
              />
            </>
          )}
          ItemSeparatorComponent={ItemSeparator}
          refreshing={usersApi.loading}
          onRefresh={() => usersApi.request()}
        />
      ) : (
        <Image source={require("../assets/Images/heroImages/authScreen.png")} />
      )}
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
});
