import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Alert, View } from "react-native";

// ? * --> application dependencies
import {
  MenuScreen,
  ProfileScreen,
  MessagesScreen,
  ArchivedScreen,
  FeedScreen,
  UsersScreen,
  ListingDetails,
  RecycleBinScreen,
  Items,
  Role,
  HelpScreen,
  AboutScreen,
  SettingsScreen,
} from "../Screens";
import routes from "./routes";
import { Icon } from "../components";
import { customProps, File } from "../config";

const Stack = createStackNavigator();

export default function MenuNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        cardShadowEnabled: true,
      }}
      mode="card"
    >
      <Stack.Screen name={routes.MENU} component={MenuScreen} />
      <Stack.Screen name={routes.HELP} component={HelpScreen} />
      <Stack.Screen name={routes.SETTINGS} component={SettingsScreen} />
      <Stack.Screen
        name={routes.ABOUT}
        component={AboutScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen name={routes.MESSAGES} component={MessagesScreen} />
      <Stack.Screen name={routes.USERS} component={UsersScreen} />
      <Stack.Screen name={routes.USER_LISTINGS} component={FeedScreen} />
      <Stack.Screen name={routes.ITEMS} component={Items} />
      <Stack.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "My Profile",
        }}
      />
      <Stack.Screen name={routes.ARCHIVED} component={ArchivedScreen} />
      <Stack.Screen name={routes.RECYCLE} component={RecycleBinScreen} />
      <Stack.Screen name={routes.IMAGES} component={Role} />
      <Stack.Screen
        name={routes.ARCHIVED_LISTING_DETAILS}
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
                onPress={() => File.Print(route.params)}
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
        name={routes.EDIT_USER_PROFILE}
        component={ProfileScreen}
        options={({ route }) => ({
          title: `Edit ${route.params.name}'s Profile`,
        })}
      />

      <Stack.Screen
        name={routes.RECYCLE_BIN_LISTING_DETAILS}
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
                onPress={() => File.Print(route.params)}
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
        name={routes.USER_LISTING_DETAILS}
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
