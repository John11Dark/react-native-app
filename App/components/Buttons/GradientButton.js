import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import { customProps } from "../../config";
import Icon from "../Interface/Icon";

export default function GradientButton({ icon, label, onPress, colors }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      >
        <Icon
          disabled
          name={icon}
          innerSize={40}
          iconColor={customProps.primaryColorLight}
          style={{ opacity: 0.9 }}
        />
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 185,
    height: 100,
    borderRadius: 10,
    margin: 5,
    shadowColor: customProps.primaryColorLight,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  background: {
    flex: 1,
    padding: 10,
    width: "100%",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  label: {
    ...customProps.font,
    color: customProps.primaryColorLight,
    marginTop: 1,
    fontWeight: "800",
    opacity: 0.7,
    textShadowColor: customProps.primaryColorLight,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
});
