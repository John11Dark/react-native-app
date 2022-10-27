import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, Screen } from "../../components";

export default function SettingsScreen({ props }) {
  return (
    <Screen>
      <Header goBack title="Settings" />
      <Text>Show price and package labels to none admins</Text>
      <Text>set the meager for user preference </Text>
      <Text>Theme </Text>
      <Text>image quality </Text>
      <Text>notifications sub instance </Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});
