import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, Screen } from "../../components";

export default function SettingsScreen({ props }) {
  return (
    <Screen>
      <Header goBack title="Settings" />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});
