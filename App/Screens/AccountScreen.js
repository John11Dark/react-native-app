import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import useAuth from "../hooks/useAuth";
import customProps from "../config/customProps";
import routes from "../Navigation/routes";
import {
  AuthorComponent,
  Icon,
  ItemSeparator,
  ListItem,
  Screen,
} from "../components";
import { useIsFocused } from "@react-navigation/native";

let menuItems = [
  {
    title: "My Profile",
    icon: {
      name: "account",
      backgroundColor: customProps.primaryColor,
    },
    targetScreen: routes.PROFILE,
  },
  {
    title: "My Messages",
    icon: {
      name: "message",
      backgroundColor: customProps.secondaryColor,
    },
    targetScreen: routes.MESSAGES,
  },
  {
    title: "Images",
    icon: {
      name: "folder-multiple-image",
      backgroundColor: "#FF9966",
    },
    targetScreen: routes.IMAGES,
  },
  {
    title: "Items",
    icon: {
      name: "package",
      backgroundColor: "#9966CC",
    },
    targetScreen: routes.ITEMS,
  },
  {
    title: "My Listing",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: customProps.TertiaryColor,
    },
    targetScreen: routes.USER_LISTINGS,
    data: { userListings: true },
  },
  {
    title: "Archived",
    icon: {
      name: "archive",
      backgroundColor: customProps.primaryColorLightGray,
    },
    targetScreen: routes.ARCHIVED,
    data: { userArchivedListings: false },
  },
  {
    title: "Recycle Bin",
    icon: {
      name: "delete-restore",
      backgroundColor: "#B5C273",
    },
    targetScreen: routes.RECYCLE,
  },
  {
    title: "Users",
    icon: {
      name: "account-group",
      backgroundColor: "#0E4C92",
    },
    targetScreen: routes.USERS,
  },
  {
    title: "logout",
    icon: {
      name: "logout",
      backgroundColor: "tomato",
    },
    targetScreen: "logout",
  },
];

export default function AccountScreen({ navigation, route }) {
  const { user, logout } = useAuth();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!user.role.includes("Admin")) {
      menuItems = menuItems.filter((item) => item.title !== "Users");
    }
  }, [isFocused]);
  console.log(user.image);
  return (
    <Screen>
      <AuthorComponent
        imagePath={{
          uri: user.image[0].url,
        }}
        title={user.name}
        subTitle={user.role}
      />

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  disabled={true}
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() =>
                item.targetScreen !== "logout"
                  ? navigation.navigate(item.targetScreen, item.data)
                  : logout()
              }
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: customProps.darkCardBackgroundColor,
    borderRadius: 25,
    overflow: "hidden",
    flex: 1.5,
    paddingVertical: 15,
    transform: [{ translateY: 40 }],
  },
});
