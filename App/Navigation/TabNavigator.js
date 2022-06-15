import React, { useEffect } from "react";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./HomeNavigator";
import ListingEditScreen from "../screens/ListingEdit";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Routes from "./routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import Navigation from "../navigation/rootNavigation";

//import TabActionButton from "./TabActionButton";

//import pushTokenApi from "../api/expoPushToken";
//import { useNotifications } from "../hooks";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { expoPushToken, response } = useNotifications();

  useEffect(() => {
    if (expoPushToken) pushTokenApi.register(expoPushToken);
  }, [expoPushToken]);

  useEffect(() => {
    if (response) Navigation.navigate("Account");
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
};
export default TabNavigator;
