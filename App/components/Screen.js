import { StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import customProps from "../config/customProps";
export default function Screen({ children, style }) {
  return <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight + 6,
    padding: 5,
    width: "100%",
    flex: 1,
    backgroundColor: customProps.primaryColorDark,
  },
});
