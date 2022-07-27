//
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFormikContext } from "formik";

//
import AppPicker from "../Forms/AppPicker";
import ListItem from "./ListItem";
import BottomActionSheet from "./BottomActionSheet";
import ErrorMessage from "../Forms/ErrorMessage";

import { customProps, Styles } from "../../config";
import addOnsData from "../../assets/Data/items";

const PickerItem = ({ item, onPress, disabled }) => {
  return (
    <>
      <View style={styles.itemQuantityContainer}>
        <Text style={styles.itemQuantityText}>
          {item.quantity > 9 ? "9+" : item.quantity}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.item]}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={styles.textItem} numberOfLines={1}>
          {item.label}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default function ItemsListPicker({
  data = addOnsData,
  disabled = false,
  name,
}) {
  // ? * -->  Hooks
  const { errors, setFieldValue, touched, values } = useFormikContext();

  // ? * --> Variables
  const items = values[name];

  // ? * -->  refs
  const scrollViewRef = useRef(null);

  // ? * --> States
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [itemProp, setItemProp] = useState(null);
  const [ItemsAddOnsListValue, setItemsAddOnsListValue] = useState(data);

  // ? * --> Functions
  function increment(item) {
    //TODO: fix the sort after increment or decrement
    Alert.alert(`${item.label}`, "increment or decrement", [
      {
        text: "increment",
        onPress: () => {
          item.quantity = item.quantity + 1;
          setFieldValue(name, [
            ...items.filter((index) => index.value != item.value),
            item,
          ]);
        },
      },
      {
        text: "decrement",
        onPress: () => {
          item.quantity > 1 ? (item.quantity = item.quantity - 1) : undefined;
          setFieldValue(name, [
            ...items.filter((index) => index.value != item.value),
            item,
          ]);
        },
        style: "destructive",
      },
      {
        text: "cancel",
      },
    ]);
  }

  function onItemAddOnsRemove(item) {
    Alert.alert(`${item.label}`, "are you sure you want to Remove this Item?", [
      {
        text: "Yes",
        onPress: () => {
          setFieldValue(
            name,
            items.filter((category) => category.value !== item.value)
          ),
            setItemsAddOnsListValue([...ItemsAddOnsListValue, item]);
          setItemsAddOnsListValue(
            ItemsAddOnsListValue.sort(
              (elementA, elementB) => elementA.value - elementB.value
            )
          );
        },
        style: "destructive",
      },
      { text: "cancel", style: "cancel" },
    ]);
  }

  function onItemAddOnsAdded(item) {
    setFieldValue(name, [...items, item]);
    setItemsAddOnsListValue(
      ItemsAddOnsListValue.filter((category) => category.value !== item.value)
    );
  }

  return (
    <View style={styles.containerParent}>
      <Text style={Styles.labelStyle}>Options</Text>

      <View style={styles.container}>
        <ScrollView
          horizontal
          onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd()}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          style={styles.containerScroll}
        >
          {items.map((item, index) => (
            <View key={`${index}_${item}`}>
              <PickerItem
                onPress={() => {
                  setItemProp(item);
                  setBottomSheetVisible(true);
                }}
                key={item}
                item={item}
                disabled={disabled}
              />
            </View>
          ))}
          <AppPicker
            style={styles.customPickerItem}
            width="100%"
            data={ItemsAddOnsListValue}
            PickerItemComponent={ListItem}
            onItemSelect={(item) => {
              onItemAddOnsAdded(item);
            }}
            iconStyle={{ marginRight: 10, top: -5 }}
            disabled={disabled}
          />
        </ScrollView>

        <ErrorMessage visible={touched[name]} error={errors[name]} />

        <BottomActionSheet
          visible={bottomSheetVisible}
          title={"Options"}
          destructiveIndex={0}
          buttonsArray={["Remove", "Increment", "Cancel"]}
          functionsArray={[onItemAddOnsRemove, increment, undefined]}
          onPress={(index) => {
            index ? index(itemProp) : undefined;
            setBottomSheetVisible(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemQuantityContainer: {
    position: "absolute",
    top: -8,
    right: 5,
    backgroundColor: customProps.secondaryColor,
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: 11,
    zIndex: 1,
  },
  itemQuantityText: {
    ...customProps.font,
    textAlign: "center",
    color: customProps.primaryColorLight,
    fontSize: 16,
  },
  containerParent: {
    width: "100%",
  },
  container: {
    ...Styles.formField,
    width: "100%",
    height: 90,
    overflow: "hidden",
  },

  containerScroll: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    flex: 1,
    paddingTop: 10,
  },
  customPickerItem: {
    width: 60,
    height: 45,
    borderRadius: 20,
    borderColor: Styles.colors.secondaryColor,
    margin: 10,
    marginTop: 0,
  },
  itemContainer: {
    margin: 10,
  },
  item: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderColor: Styles.colors.primaryColor,
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  textItem: {
    ...Styles.colors.font,
    color: Styles.colors.primaryColor,
    fontSize: 15,
  },
});
