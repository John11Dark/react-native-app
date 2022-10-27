import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { customProps } from "../../config";

export default function DeleteItemAction({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name={"trash-can"}
          color={customProps.primaryColorLight}
          size={35}
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
    width: 50,
    height: "100%",
  },
});
