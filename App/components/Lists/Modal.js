// Third Parties Libraries
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

// custom Libraries
import customProps from "../../config/customProps";
import Screen from "../Screen";
/**
 *
 * @summary
 * @param {Object} data
 * @param {Boolean} isVisible
 * @param {Component} ItemSeparatorComponent
 * @param {Key} ItemSeparatorComponent
 * @param {Number} numOfColumns
 * @param {Function} onClose
 * @param {Object} renderItem
 * @param {Object} otherListProps
 * @returns Modal component
 */
export default function AppModal({
  data,
  isVisible,
  ItemSeparatorComponent,
  keyExtractor,
  numOfColumns = 1,
  onClose,
  renderItem,
  ...otherListProps
}) {
  return (
    <Modal visible={isVisible} animationType="slide">
      <Screen>
        <TouchableWithoutFeedback onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableWithoutFeedback>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={keyExtractor}
          numColumns={numOfColumns}
          renderItem={renderItem}
          {...otherListProps}
        />
        {/* <TextInput
          name="otherItemBox"
          placeholder={"Other..."}
          style={styles.textInput}
        /> */}
      </Screen>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: customProps.secondaryColor,
    marginVertical: 20,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  textInput: {
    width: "80%",
    maxWidth: 350,
    alignSelf: "center",
    borderRadius: 15,
    top: -200,
    fontSize: 30,
    color: customProps.primaryColorLight,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: customProps.secondaryColor,
  },
});
