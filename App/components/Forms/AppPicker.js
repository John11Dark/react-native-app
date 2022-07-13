import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Styles } from "../../config/";
import AppModal from "../Lists/Modal";
import PickerItem from "../Forms/PickerItem";
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
  style,
}) {
  const [visible, setVisible] = useState(false);

  const handleModalClose = () => {
    setVisible(false);
  };

  const handleSelect = (item) => {
    // if (item.name) {
    //   alert("you must type the name in the box below!");
    // }
    onItemSelect(item);
    handleModalClose();
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View style={[styles.container, { width: width, ...style }]}>
          {icon && (
            <MaterialCommunityIcons
              name={data[0].icon}
              style={[styles.icon, iconStyle]}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <View>
            <MaterialCommunityIcons
              name="chevron-down"
              color={Styles.colors.secondaryColor}
              size={35}
              style={iconStyle}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <AppModal
        data={data}
        isVisible={visible}
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
    ...Styles.formField,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: Styles.colors.primaryColorLightGray,
  },
  rightIcon: {
    marginRight: 0,
    fontSize: 20,
  },
  placeholder: {
    ...Styles.colors.font,
    flex: 1,
    paddingVertical: 10,
    color: Styles.colors.primaryColorLight,
  },
  text: {
    ...Styles.colors.font,
    color: Styles.colors.primaryColorLight,
    fontSize: 22.5,
    flex: 1,
    paddingVertical: 10,
  },
});
