import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import Icon from "./Icon";
import customProps from "../config/customProps";

export default function DeleteItemAction({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon
          name={"trash-can"}
          backgroundColor={customProps.importantIconColor}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: customProps.importantIconColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
