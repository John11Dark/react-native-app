import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import {
  AccountScreen,
  MessagesScreen,
  ArchivedScreen,
  ProfileScreen,
  FeedScreen,
  UsersScreen,
  ListingDetails,
  RecycleBinScreen,
  GalleryScreen,
} from "../Screens";
import Routes from "./routes";
import { Icon } from "../components";
import { customProps } from "../config";

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
      <Stack.Screen name={Routes.IMAGES} component={GalleryScreen} />
      <Stack.Screen
        name={Routes.ITEMS}
        component={FeedScreen}
        options={{ title: "My listings" }}
      />
      <Stack.Screen
        name={Routes.USER_LISTING_DETAILS}
        component={ListingDetails}
        options={({ route }) => ({
          headerRight: () => (
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Icon
                onPress={() => File.print(route.params)}
                iconColor={customProps.primaryColor}
                backgroundColor="transparent"
                name="printer"
                innerSize={35}
              />
              <Icon
                onPress={() => File.Share(route.params)}
                iconColor={customProps.secondaryColor}
                backgroundColor="transparent"
                name="share"
                innerSize={40}
              />
            </View>
          ),
          headerShown: true,
          headerTransparent: true,
          headerTitle: false,
          headerBackTitleVisible: false,
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
          headerRight: () => (
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Icon
                onPress={() => File.print(route.params)}
                iconColor={customProps.primaryColor}
                backgroundColor="transparent"
                name="printer"
                innerSize={35}
              />
              <Icon
                onPress={() => File.Share(route.params)}
                iconColor={customProps.secondaryColor}
                backgroundColor="transparent"
                name="share"
                innerSize={40}
              />
            </View>
          ),
          headerShown: true,
          headerTransparent: true,
          headerTitle: false,
          headerBackTitleVisible: false,
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
          headerRight: () => (
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Icon
                onPress={() => File.print(route.params)}
                iconColor={customProps.primaryColor}
                backgroundColor="transparent"
                name="printer"
                innerSize={35}
              />
              <Icon
                onPress={() => File.Share(route.params)}
                iconColor={customProps.secondaryColor}
                backgroundColor="transparent"
                name="share"
                innerSize={40}
              />
            </View>
          ),
          headerShown: true,
          headerTransparent: true,
          headerTitle: false,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}
