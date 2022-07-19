import React, { useEffect } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { userApi } from "../api";
import { useApi, useAuth } from "../hooks";
import Routes from "../Navigation/routes";
import {
  Screen,
  DataLoadingError,
  ListItem,
  ItemSeparator,
} from "../components";

const NotificationScreen = () => {
  // hooks and states
  const navigation = useNavigation();
  const { data, error, loading, request } = useApi(userApi.getAll);
  const { user } = useAuth();
  // effect hooks
  useEffect(() => {
    request();
  }, []);
  return (
    <Screen>
      <DataLoadingError
        imageViable
        visible={error}
        text="could not load notifications from the server"
        onPress={() => request()}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  listItem: {
    borderRadius: 0,
    margin: 0,
  },
});
export default NotificationScreen;
