import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import ItemsSeparator from "./ItemsSeparator";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "./Modal";
import PickerItem from "./PickerItem";
import customProps from "../../config/customProps";

export default function AppPicker({
  data,
  icon,
  iconStyle,
  numOfColumns,
  onItemSelect,
  placeholder,
  PickerItemComponent = PickerItem,
  selectedItem,
  width = "100%",
}) {
  const [visible, setVisible] = useState(false);

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleSelect = (item) => {
    onItemSelect(item);
    handleModalClose();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              style={[styles.icon, iconStyle]}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            style={[styles.icon, styles.rightIcon]}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        data={data}
        isVisible={visible}
        ItemSeparatorComponent={ItemsSeparator}
        keyExtractor={(item) => item.value.toString()}
        numOfColumns={numOfColumns}
        onClose={handleModalClose}
        renderItem={({ item }) => (
          <PickerItemComponent item={item} onPress={() => handleSelect(item)} />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...customProps.formField,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: customProps.primaryColorLightGray,
  },
  rightIcon: {
    marginRight: 0,
  },
  placeholder: {
    ...customProps.font,
    flex: 1,
    paddingVertical: 10,
    color: customProps.primaryColorLight,
  },
  text: {
    ...customProps.font,
    flex: 1,
    paddingVertical: 10,
  },
});
