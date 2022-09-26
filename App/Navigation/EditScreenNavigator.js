// application third parties libraries
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// application
import {
  ListingEditMainScreen,
  ListingEditScreen,
  ListingEditScreenOptions,
  ListingEditFinalScreen,
} from "../Screens";
import routes from "./routes";

// hooks
const Stack = createStackNavigator();

// main stack
export default function EditScreenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={routes.LISTING_EDIT_MAIN}
        component={ListingEditMainScreen}
      />
      <Stack.Screen name={routes.LISTING_EDIT} component={ListingEditScreen} />

      <Stack.Screen
        name={routes.LISTING_EDIT_OPTIONS}
        component={ListingEditScreenOptions}
      />
      <Stack.Screen
        name={routes.LISTING_EDIT_FINAL}
        component={ListingEditFinalScreen}
      />
    </Stack.Navigator>
  );
}
