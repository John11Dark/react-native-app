import { Image, StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";
import SearchBar from "./SearchBar";
import { customProps } from "../../config";
import { useAuth } from "../../hooks";
import functions from "../../config/Functions/functions";
import Icon from "../Icon";
import { useNavigation } from "@react-navigation/native";
export default function Header({
  title = "Today",
  subTitle = "",
  searchBar = false,
  uri,
  goBack,
  style,
}) {
  const navigation = useNavigation();
  const { user } = useAuth();
  !subTitle ? (subTitle = functions.greeting(Date(user.iat))) : subTitle;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.flexConcent}>
        <View style={styles.textContainer}>
          {goBack && (
            <Icon
              name={"keyboard-backspace"}
              backgroundColor={"transparent"}
              iconColor={customProps.primaryColorLight}
              onPress={() => navigation.goBack()}
              style={styles.goBack}
            />
          )}
          <Text style={styles.title}>{title}</Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {subTitle} {user.name}
          </Text>
        </View>
        <Image
          resizeMode="contain"
          source={require("../../assets/Images/heroImages/FeedHero.png")}
          style={{ width: 140, height: 110, left: -10, top: -5 }}
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
    overflow: "hidden",
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
    fontSize: 44,
    textAlign: "left",
    maxWidth: 265,
  },
  subTitle: {
    ...customProps.font,
    fontSize: 18,
    textTransform: "capitalize",
    color: customProps.secondaryColor,
    textAlign: "left",
    maxWidth: 265,
  },
  textContainer: {
    marginLeft: 15,
    justifyContent: "flex-start",
  },
  goBack: {
    position: "absolute",
    top: -30,
    left: -30,
    backgroundColor: customProps.secondaryColor,
    zIndex: -1,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 40,
    height: 40,
    paddingTop: 10,
  },
});
