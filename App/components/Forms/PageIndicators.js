import { StyleSheet, View } from "react-native";
import React from "react";
import { customProps } from "../../config";

export default function PageIndicators({
  indicatorOne = { id: 1, active: true, error: false, current: false },
  indicatorTwo = { id: 2, active: false, error: false, current: false },
  indicatorThree = { id: 3, active: false, error: false, current: false },
  indicatorFour = { id: 4, active: false, error: false, current: false },
}) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.indicator,
          indicatorOne.active ? styles.active : undefined,
          indicatorOne.error ? styles.error : undefined,
          indicatorOne.current ? styles.boxShadow : undefined,
          indicatorOne.current && indicatorTwo.error
            ? styles.boxShadowError
            : undefined,
        ]}
      ></View>
      <View
        style={[
          styles.indicator,
          indicatorTwo.active ? styles.active : undefined,
          indicatorTwo.error ? styles.error : undefined,
          indicatorTwo.current ? styles.boxShadow : undefined,
          indicatorTwo.current && indicatorTwo.error
            ? styles.boxShadowError
            : undefined,
        ]}
      ></View>
      <View
        style={[
          styles.indicator,
          indicatorThree.active ? styles.active : undefined,
          indicatorThree.error ? styles.error : undefined,
          indicatorThree.current ? styles.boxShadow : undefined,
          indicatorThree.current && indicatorTwo.error
            ? styles.boxShadowError
            : undefined,
        ]}
      ></View>
      <View
        style={[
          styles.indicator,
          indicatorFour.active ? styles.active : undefined,
          indicatorFour.error ? styles.error : undefined,
          indicatorFour.current ? styles.boxShadow : undefined,
          indicatorFour.current && indicatorTwo.error
            ? styles.boxShadowError
            : undefined,
        ]}
      ></View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 30,
    marginVertical: 10,
    alignItems: "center",
  },
  indicator: {
    width: 85,
    height: 10,
    borderRadius: 20,
    opacity: 0.75,
    backgroundColor: customProps.darkOpacity,
  },
  boxShadow: {
    shadowColor: customProps.secondaryColor,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 1,
  },
  boxShadowError: {
    shadowColor: customProps.importantIconColor,
  },
  active: {
    backgroundColor: customProps.secondaryColor,
    opacity: 1,
  },
  error: {
    backgroundColor: customProps.importantIconColor,
  },
});
