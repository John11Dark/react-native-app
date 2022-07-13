import React, { useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import AppPicker from "../Forms/AppPicker";

const PickerItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={[styles.item]} onPress={onPress}>
      <Text style={styles.textItem} numberOfLines={1}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

import { Styles } from "../../config";
const ItemsListPicker = ({ onItemRemove, onItemAdd, Items, data }) => {
  const scrollViewRef = useRef(null);

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
          {Items.map((item, index) => (
            <View key={`${index}_${item}`}>
              <PickerItem
                onPress={() => onItemRemove(item)}
                key={item}
                item={item}
              />
            </View>
          ))}
          <AppPicker
            style={styles.customPickerItem}
            width="100%"
            data={data}
            onItemSelect={(item) => onItemAdd(item)}
            iconStyle={{ marginRight: 10, top: -5 }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerParent: {
    width: "100%",
  },
  container: {
    ...Styles.formField,
    width: "100%",
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

export default ItemsListPicker;
