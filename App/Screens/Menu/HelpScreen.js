import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Header, Screen } from "../../components";

export default function HelpScreen({ props }) {
  return (
    <Screen>
      <Header goBack title="Help" />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
});
