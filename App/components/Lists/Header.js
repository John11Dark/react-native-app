import { Image, StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";
import SearchBar from "./SearchBar";
import { customProps } from "../../config";
import { useAuth } from "../../hooks";
import functions from "../../config/Functions/functions";
export default function Header({
  title = "Today",
  subTitle = "",
  username = "John",
  searchBar,
  uri,
}) {
  const { user } = useAuth();
  !subTitle ? (subTitle = functions.greeting(Date(user.iat))) : subTitle;
  return (
    <View style={styles.container}>
      <View style={styles.flexConcent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {subTitle} {user.name}
          </Text>
        </View>
        <Image
          resizeMode="contain"
          source={require("../../assets/Images/heroImages/Feedhero.png")}
          style={{ width: 140, height: 110, left: 10, top: -5 }}
        />
      </View>
      <Image source={{ uri: uri }} />
      <SearchBar visible={searchBar} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    width: "98%",
    minHeight: 140,
    alignSelf: "center",
    paddingTop: 10,
    backgroundColor: customProps.darkOpacity,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 10,
    shadowColor: customProps.secondaryColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 4,
  },
  flexConcent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    height: 110,
  },
  title: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    fontWeight: "900",
    fontSize: 45,
    textAlign: "left",
  },
  subTitle: {
    ...customProps.font,
    fontSize: 18,
    textTransform: "capitalize",
    color: customProps.secondaryColor,
    textAlign: "left",
    maxWidth: 250,
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: "flex-start",
  },
});
