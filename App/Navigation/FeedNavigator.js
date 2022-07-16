import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Routes from "./routes";
import { FeedScreen, ListingDetails, ViewImage } from "../Screens";
import { customProps } from "../config";
import { Icon, File } from "../components";
import { View } from "react-native";
const Stack = createStackNavigator();

export default function FeedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
      <Stack.Screen name={Routes.LISTINGS} component={FeedScreen} />
      <Stack.Screen name={Routes.VIEW_IMAGE} component={ViewImage} />
      <Stack.Screen
        name={Routes.LISTING_DETAILS}
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
