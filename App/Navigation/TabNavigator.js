import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import routes from "./routes";
import Navigation from "../Navigation/rootNavigation";
import MenuNavigator from "./MenuNavigator";
import FeedNavigator from "./FeedNavigator";
import EditScreenNavigator from "./EditScreenNavigator";
import TabActionButton from "./TabActionButton";
import { NotificationScreen, SearchScreen } from "../Screens";
import { useAuth, useNotifications } from "../hooks";
import pushTokenApi from "../api/expoPushToken";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { expoPushToken, response } = useNotifications();
  const { user } = useAuth();
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
        name={routes.LISTINGS}
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.SEARCH}
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
        name={routes.LISTING_EDIT_MAIN}
        component={EditScreenNavigator}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TabActionButton
              onPress={() => navigation.navigate("ListingEditMain")}
            />
          ),
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name={routes.NOTIFICATION}
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.MENU}
        component={MenuNavigator}
        options={{
          tabBarIcon: ({ size, color }) =>
            user?.image[0].thumbnailUrl ? (
              <Image
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                }}
                source={{ uri: user.image[0].thumbnailUrl }}
              />
            ) : (
              <MaterialCommunityIcons name="menu" size={size} color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
