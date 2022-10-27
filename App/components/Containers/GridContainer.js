import { StyleSheet, View, Text } from "react-native";
import React from "react";
import GradientButton from "../Buttons/GradientButton";
import { useNavigation } from "@react-navigation/native";
import { customProps } from "../../config";

export default function GridContainer({ items, label }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <GradientButton
            key={index}
            icon={item?.icon.name}
            label={item?.title}
            colors={item?.colors}
            onPress={() => navigation.navigate(item.targetScreen, item?.data)}
          />
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: customProps.darkOpacity,
    paddingVertical: 15,
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  label: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    fontSize: 30,
    fontWeight: "700",
    margin: 10,
    marginTop: 0,
    textTransform: "capitalize",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
