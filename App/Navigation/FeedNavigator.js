import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Alert } from "react-native";

import Routes from "./routes";
import { FeedScreen, ListingDetails, GalleryScreen } from "../Screens";
import { customProps, File } from "../config";
import { Icon } from "../components";
const Stack = createStackNavigator();

export default function FeedNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} mode="modal">
      <Stack.Screen name={Routes.LISTINGS} component={FeedScreen} />
      <Stack.Screen name={Routes.VIEW_IMAGE} component={GalleryScreen} />
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
                onPress={() =>
                  Alert.alert(
                    `Print ${route.params?.site} PDF File`,
                    "Choose for whom you want to print the File.",
                    [
                      {
                        text: "Client",
                        style: "destructive",
                        onPress: () => File.Print(route.params),
                      },
                      {
                        text: "Self",
                        style: "default",
                        onPress: () => File.Print(route.params),
                      },
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                    ]
                  )
                }
                iconColor={customProps.primaryColor}
                backgroundColor="transparent"
                name="printer"
                innerSize={35}
              />
              <Icon
                onPress={() =>
                  Alert.alert(
                    `Share ${route.params?.site} PDF File`,
                    "Choose With whom you want to share the File.",
                    [
                      {
                        text: "Client",
                        style: "destructive",
                        onPress: () => File.Share(route.params),
                      },
                      {
                        text: "Self",
                        style: "default",
                        onPress: () => File.Share(route.params),
                      },
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                    ]
                  )
                }
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
