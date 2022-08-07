import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Screen, SearchBar, Icon, AppModal } from "../components";
import { customProps } from "../config";
const SearchScreen = () => {
  const [visible, setVisible] = useState(false);
  const filterSearch = () => {
    setVisible(true);
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
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../assets/Images/heroImages/Search.png")}
        />
        <Text style={styles.text}>What are you looking for?</Text>
      </View>
      <AppModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        data={["users", "Projects", "Skimmer", "Overflow"]}
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
