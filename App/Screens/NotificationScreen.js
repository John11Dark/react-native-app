import React, { useEffect } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { userApi } from "../api";
import { useApi, useAuth } from "../hooks";
import Routes from "../Navigation/routes";
import {
  Screen,
  DataLoadingError,
  ListItem,
  ItemSeparator,
  Header,
} from "../components";
import { customProps } from "../config";

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
      <Header searchBar={false} title="Notifications" />
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../assets/Images/heroImages/NotificationsScreen.png")}
        />
        <Text style={styles.text}>There is Nothing To display</Text>
      </View>
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
  image: {
    width: 350,
    alignSelf: "center",
    height: 300,
  },
  text: {
    ...customProps.font,
    fontSize: customProps.largePrimaryTextFontSize,
    textAlign: "center",
    color: customProps.primaryColorLight,
    fontWeight: "700",
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default NotificationScreen;
