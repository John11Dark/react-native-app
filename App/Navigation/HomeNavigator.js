import { ListingDetailsScreen, ListingsScreen } from "../Screens";

import { Platform } from "react-native";
import React from "react";
import Routes from "./routes";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
    <Stack.Screen name={Routes.LISTINGS} component={ListingsScreen} />
    <Stack.Screen
      name={Routes.LISTING_DETAILS}
      component={ListingDetailsScreen}
      options={({ route }) => ({
        headerShown: Platform.OS === "android" ? true : false,
        title: route.params.title,
      })}
    />
  </Stack.Navigator>;
}
