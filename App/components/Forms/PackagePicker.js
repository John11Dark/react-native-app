// ? * -->
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert, Text, View } from "react-native";

// ? * -->
import { customProps } from "../../config";
import AppModal from "../Lists/Modal";
// ? * --> mainStack
export default function PackagePicker({
  selectedPackage = {},
  packages = [],
  totalPrice = {},
}) {
  // ? * -->  States
  /// *-->//  Application State
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          Alert.alert(
            "Recommended Package",
            "Are you sure you want to change the selected package?",
            [
              {
                text: "Change",
                style: "destructive",
                onPress: () => {
                  setModalVisible(true);
                },
              },
              {
                text: "No",
                style: "cancel",
              },
            ]
          )
        }
      >
        <Text style={styles.title}>Recommended Package 📦</Text>
        <View>
          <Text style={styles.label}>Package name:</Text>
          <Text>{selectedPackage.label}</Text>
        </View>

        <Text style={styles.label}>
          Filter name: {selectedPackage.filter.name}{" "}
        </Text>
        <Text style={styles.label}>
          Package Price: {selectedPackage.price}{" "}
        </Text>
        <Text style={styles.price}>Total Price: {totalPrice.total} </Text>
      </TouchableOpacity>
      <AppModal
        isVisible={modalVisible}
        data={packages}
        selectedItem={selectedPackage.id}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  labelName: {
    ...customProps.font,
    fontSize: 21,
    fontWeight: "700",
    color: customProps.primaryColorLightGray,
    textAlign: "left",
    alignSelf: "flex-start",
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  title: {
    ...customProps.font,
    fontWeight: "700",
    color: customProps.TertiaryColor,
    margin: 5,
    textAlign: "left",
    alignSelf: "flex-start",
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  flexDirection: {
    width: "100%",
    justifyContent: "flex-start",
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    ...customProps.font,
    fontSize: 20,
    fontWeight: "800",
    color: customProps.primaryColorLight,
    alignSelf: "flex-start",
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  price: {
    ...customProps.font,
    fontSize: 21,
    fontWeight: "800",
    color: customProps.darkOpacity,
    alignSelf: "flex-start",
  },
  container: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(200,240,210,0.89)",
    shadowColor: customProps.TertiaryColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    padding: 20,
    marginVertical: 10,
    borderRadius: 5,
    borderTopEndRadius: 25,
    borderBottomStartRadius: 25,
    minHeight: 120,
    overflow: "hidden",
  },
});
