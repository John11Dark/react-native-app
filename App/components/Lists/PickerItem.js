import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AppPicker({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    width: "100%",
    padding: 10,
    textAlign: "center",
  },
});
