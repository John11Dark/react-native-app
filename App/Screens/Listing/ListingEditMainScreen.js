import { StyleSheet, View, Image, Text } from "react-native";
import React from "react";

import { PrimaryButton, SecondaryButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { customProps } from "../../config";
import { routes } from "../../Navigation";

export default function ListingEditMain({ props }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Images/heroImages/HeaderLogoHigh.png")}
        style={styles.image}
      />
      <Text style={styles.text}>{"Choose Quotation type"}</Text>
      <PrimaryButton
        handlePress={() =>
          navigation.navigate(routes.LISTING_EDIT_NEW, { newPool: true })
        }
        iconName={"new-box"}
        title={"New"}
        visible
      />
      <SecondaryButton
        handlePress={() =>
          navigation.navigate(routes.LISTING_EDIT_REFURBISHMENT, {
            newPool: false,
          })
        }
        iconName={"update"}
        title={"Refurbishment"}
        visible
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
  text: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
});
