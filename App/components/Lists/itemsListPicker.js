import React, { useRef } from "react";
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
import ListItem from "../Lists/ListItem";
import ErrorMessage from "../Forms/ErrorMessage";
import { Styles } from "../../config";
import addOnsData from "../../assets/Data/items";

const PickerItem = ({ item, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.item]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.textItem} numberOfLines={1}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

function onItemAddOnsRemove(
  item,
  list,
  setList,
  originalList,
  setOriginalList
) {
  Alert.alert(`${item.label}`, "are you sure you want to Remove this Item?", [
    {
      text: "Yes",
      onPress: () => {
        setList(list.filter((category) => category.value !== item.value)),
          setOriginalList([...originalList, item]);
        setOriginalList(
          originalList.sort(
            (elementA, elementB) => elementA.value - elementB.value
          )
        );
      },
      style: "destructive",
    },
    { text: "Add", style: "cancel" },
  ]);
}

function onItemAddOnsAdded(item, list, setList, originalList, setOriginalList) {
  setList([...list, item]);
  setOriginalList(
    originalList.filter((category) => category.value !== item.value)
  );
}
export default function ItemsListPicker({
  data = addOnsData,
  disabled = false,
  name,
}) {
  const scrollViewRef = useRef(null);
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const items = values[name];
  return (
    <View style={styles.containerParent}>
      <Text style={Styles.labelStyle}>Options</Text>
      <View style={styles.container}>
        <ScrollView
          horizontal
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          style={styles.containerScroll}
        >
          {items.map((item, index) => (
            <View key={`${index}_${item}`}>
              <PickerItem
                onPress={() => {
                  setFieldValue(
                    name,
                    items.filter((category) => category.value != item.value)
                  );
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
            data={data}
            PickerItemComponent={ListItem}
            onItemSelect={(item) => {
              setFieldValue(name, [...items, item]);
            }}
            iconStyle={{ marginRight: 10, top: -5 }}
            disabled={disabled}
          />
        </ScrollView>
        <ErrorMessage visible={touched[name]} error={errors[name]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
