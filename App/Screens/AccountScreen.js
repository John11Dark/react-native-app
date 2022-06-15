import { FlatList, StyleSheet, Text, View } from "react-native";

import AuthorComponent from "../components/Lists/AuthorComponent";
import Icon from "../components/Icon";
import ItemSeparator from "../components/Lists/ItemsSeparator";
import ListItem from "../components/Lists/ListItem";
import Screen from "../components/Screen";
import customProps from "../config/customProps";

const menuItems = [
  {
    title: "My Account",
    icon: {
      name: "account",
      backgroundColor: customProps.primaryColor,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "message",
      backgroundColor: customProps.secondaryColor,
    },
  },
  {
    title: "My Listing",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: customProps.TertiaryColor,
    },
  },
  {
    title: "Archived",
    icon: {
      name: "archive",
      backgroundColor: customProps.primaryColorLightGray,
    },
  },
  {
    title: "signin",
    icon: {
      name: "logout",
      backgroundColor: "tomato",
    },
  },
  {
    title: "logout",
    icon: {
      name: "logout",
      backgroundColor: "tomato",
    },
  },
];

export default function AccountScreen() {
  return (
    <Screen>
      <AuthorComponent
        imagePath={require("../assets/favicon.png")}
        title="John Muller"
        subTitle="Admin"
      />
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 15,
    backgroundColor: customProps.darkCardBackgroundColor,
    borderRadius: 25,
    overflow: "hidden",
    flex: 1.5,
    paddingVertical: 15,
    transform: [{ translateY: 50 }],
  },
});
