import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  AccountScreen,
  MessagesScreen,
  ArchivedScreen,
  ProfileScreen,
  FeedScreen,
  UsersScreen,
  ListingDetails,
  RecycleBinScreen,
} from "../Screens";
import Routes from "./routes";

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
        name={Routes.USER_LISTING_DETAILS}
        component={ListingDetails}
        options={({ route }) => ({
          title: route.params.title,
        })}
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

      <Stack.Screen
        name={Routes.ARCHIVED_LISTING_DETAILS}
        component={ListingDetails}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name={Routes.EDIT_USER_PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          title: `Edit ${route.params.name}'s Profile`,
        })}
      />
      <Stack.Screen
        name={Routes.RECYCLE}
        component={RecycleBinScreen}
        options={{ title: "Recycle bin" }}
      />
      <Stack.Screen
        name={Routes.RECYCLE_BIN_LISTING_DETAILS}
        component={ListingDetails}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
}
