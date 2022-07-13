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
      {data ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={data}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.name === user.name ? "You" : item.name}
              subTitle={item.role}
              styleParameter={styles.listItem}
              onPress={() => navigation.navigate(Routes.PROFILE, item)}
              imagePath={
                item.images[0].url
                  ? item.images[0].url
                  : "https://omnatigray.org/wp-content/uploads/2021/02/profile-placeholder.png?gid=2"
              }
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
          refreshing={loading}
          onRefresh={() => request()}
        />
      ) : !error ? (
        <Image source={require("../assets/Images/heroImages/authScreen.png")} />
      ) : (
        <DataLoadingError
          imageViable
          visible
          text="Couldn't get users from server"
          onPress={() => request()}
        />
      )}
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
