import {
  AccountScreen,
  MessagesScreen,
  ArchivedScreen,
  ProfileScreen,
  FeedScreen,
  UsersScreen,
} from "../Screens";

import React from "react";
import Routes from "./routes";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.ACCOUNT}
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.MESSAGES}
        component={MessagesScreen}
        options={{ title: "Messages" }}
      />
      <Stack.Screen
        name={Routes.USERS}
        component={UsersScreen}
        options={{ title: "Users" }}
      />
      <Stack.Screen
        name={Routes.USER_LISTINGS}
        component={FeedScreen}
        options={{ title: "My listings" }}
      />
      <Stack.Screen
        name={Routes.PROFILE}
        component={ProfileScreen}
        options={{ title: "My Profile" }}
      />
      <Stack.Screen
        name={Routes.ARCHIVED}
        component={ArchivedScreen}
        options={{ title: "Archived" }}
      />
    </Stack.Navigator>
  );
}
