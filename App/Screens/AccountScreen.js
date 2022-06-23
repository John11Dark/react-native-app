import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import useAuth from "../hooks/useAuth";
import customProps from "../config/customProps";
import {
  AuthorComponent,
  Icon,
  ItemSeparator,
  ListItem,
  Screen,
} from "../components";

const menuItems = [
  {
    title: "My Profile",
    icon: {
      name: "account",
      backgroundColor: customProps.primaryColor,
    },
    targetScreen: "Profile",
  },
  {
    title: "My Messages",
    icon: {
      name: "message",
      backgroundColor: customProps.secondaryColor,
    },
    targetScreen: "Messages",
  },
  {
    title: "My Listing",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: customProps.TertiaryColor,
    },
    targetScreen: "Listings",
  },
  {
    title: "Archived",
    icon: {
      name: "archive",
      backgroundColor: customProps.primaryColorLightGray,
    },
    targetScreen: "Archived",
  },
  {
    title: "Users",
    icon: {
      name: "account-group",
      backgroundColor: "#0E4C92",
    },
    targetScreen: "Users",
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

export default function AccountScreen({ navigation }) {
  const { user, logout } = useAuth();
  if (!user.role.includes("Admin")) {
    menuItems.splice(4, 1);
  }
  return (
    <Screen>
      <AuthorComponent
        imagePath={{ uri: user.userAvatarImageUri.images[0].url }}
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
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() =>
                item.targetScreen !== "logout"
                  ? navigation.navigate(item.targetScreen)
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
