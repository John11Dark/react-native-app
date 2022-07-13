import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import {
  ListingEditScreen,
  NotificationScreen,
  UsersScreen,
  SearchScreen,
} from "../Screens";
import Routes from "./routes";
import TabActionButton from "./TabActionButton";
import Navigation from "../Navigation/rootNavigation";
import pushTokenApi from "../api/expoPushToken";
import { useNotifications } from "../hooks";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { expoPushToken, response } = useNotifications();

  useEffect(() => {
    if (expoPushToken) pushTokenApi.register(expoPushToken);
  }, [expoPushToken]);

  useEffect(() => {
    if (response) {
      Navigation.navigate(response.notification.request.content.data.navigate);
    }
  }, [response]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="layers-search"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ListingEdit"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TabActionButton
              onPress={() => navigation.navigate(Routes.LISTING_EDIT)}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
