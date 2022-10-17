import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Screen, Header } from "../../components";
import { customProps } from "../../config";
const SearchScreen = () => {
  return (
    <Screen style={styles.container}>
      <Header
        searchBar
        title="Search"
        username={false}
        subTitle={`What are you looking for ?`}
      />
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../assets/Images/heroImages/Search.png")}
        />
        <Text style={styles.text}>What are you looking for?</Text>
      </View>
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
  image: {
    width: 350,
    alignSelf: "center",
    height: 350,
  },
  text: {
    ...customProps.font,
    fontSize: customProps.largePrimaryTextFontSize,
    textAlign: "center",
    color: customProps.primaryColorLight,
    fontWeight: "700",
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
