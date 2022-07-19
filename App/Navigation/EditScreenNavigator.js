import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Routes from "./routes";
import { ListingEditScreenOptions, ListingEditScreen } from "../Screens";
const Stack = createStackNavigator();

export default function EditScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
      <Stack.Screen name={Routes.LISTING_EDIT} component={ListingEditScreen} />
      <Stack.Screen
        name={Routes.LISTING_EDIT_OPTIONS}
        component={ListingEditScreenOptions}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
