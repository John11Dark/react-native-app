import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { customProps } from "../../config";

export default function PageIndicators({
  title,
  indicatorOne = {
    id: 1,
    active: true,
    error: false,
    current: false,
    canGoBack: true,
  },
  indicatorTwo = {
    id: 2,
    active: false,
    error: false,
    current: false,
    canGoBack: true,
  },
  indicatorThree = {
    id: 3,
    active: false,
    error: false,
    current: false,
    canGoBack: true,
  },
  indicatorFour = {
    id: 4,
    active: false,
    error: false,
    current: false,
    canGoBack: true,
  },
}) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.indicatorsContainer}>
        <TouchableOpacity
          disabled={indicatorOne.canGoBack}
          style={[
            styles.indicator,
            indicatorOne.active ? styles.active : undefined,
            indicatorOne.error ? styles.error : undefined,
            indicatorOne.current ? styles.boxShadow : undefined,
            indicatorOne.current && indicatorTwo.error
              ? styles.boxShadowError
              : undefined,
          ]}
        ></TouchableOpacity>
        <TouchableOpacity
          disabled={indicatorTwo.canGoBack}
          style={[
            styles.indicator,
            indicatorTwo.active ? styles.active : undefined,
            indicatorTwo.error ? styles.error : undefined,
            indicatorTwo.current ? styles.boxShadow : undefined,
            indicatorTwo.current && indicatorTwo.error
              ? styles.boxShadowError
              : undefined,
          ]}
        ></TouchableOpacity>
        <TouchableOpacity
          disabled={indicatorThree.canGoBack}
          style={[
            styles.indicator,
            indicatorThree.active ? styles.active : undefined,
            indicatorThree.error ? styles.error : undefined,
            indicatorThree.current ? styles.boxShadow : undefined,
            indicatorThree.current && indicatorTwo.error
              ? styles.boxShadowError
              : undefined,
          ]}
        ></TouchableOpacity>
        <TouchableOpacity
          disabled={indicatorFour.canGoBack}
          style={[
            styles.indicator,
            indicatorFour.active ? styles.active : undefined,
            indicatorFour.error ? styles.error : undefined,
            indicatorFour.current ? styles.boxShadow : undefined,
            indicatorFour.current && indicatorTwo.error
              ? styles.boxShadowError
              : undefined,
          ]}
        ></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 120,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: customProps.secondaryColor,
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  title: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    textAlign: "center",
    marginTop: 45,
    marginBottom: 20,
  },
  indicator: {
    width: 85,
    height: 10,
    borderRadius: 20,
    opacity: 0.75,
    backgroundColor: customProps.darkOpacity,
  },
  boxShadow: {
    shadowColor: customProps.TertiaryColor,
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 1,
  },
  boxShadowError: {
    shadowColor: customProps.importantIconColor,
  },
  active: {
    backgroundColor: customProps.TertiaryColor,
    opacity: 1,
  },
  error: {
    backgroundColor: customProps.importantIconColor,
  },
});
