import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Screen, SearchBar, Icon } from "../components";

const SearchScreen = () => {
  const filterSearch = () => {
    console.log("first");
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <SearchBar visible />
        <Icon
          name="filter"
          backgroundColor="transparent"
          onPress={filterSearch}
        />
      </View>
      <Image
        source={require("../assets/Images/heroImages/Search.png")}
        style={styles.heroImage}
      />
    </Screen>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  header: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  heroImage: {
    alignSelf: "center",
    width: "95%",
    height: 400,
    position: "absolute",
    bottom: 10,
  },
});
