import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Header, Icon, Screen } from "../components";
import { customProps } from "../config";

const folders = [
  {
    id: 1,
    label: "Skimmer",
    iconName: "folder-multiple-image",
    images: [
      {
        id: 1,
        uri: "http//:192.168.1.181:9000/assets/JohnMuller_full.jpg",
      },
    ],
  },
  {
    id: 2,
    label: "Overflow",
    iconName: "folder-multiple-image",
    images: [
      {
        id: 2,
        uri: "http//:192.168.1.181:9000/assets/JohnMuller_full.jpg",
      },
    ],
  },
  {
    id: 3,
    label: "Online",
    iconName: "folder-multiple-image",
    images: [
      {
        id: 3,
        uri: "http//:192.168.1.181:9000/assets/JohnMuller_full.jpg",
      },
    ],
  },
  {
    id: 4,
    label: "Saved",
    iconName: "folder-multiple-image",
    images: [
      {
        id: 4,
        uri: "http//:192.168.1.181:9000/assets/JohnMuller_full.jpg",
      },
    ],
  },
];

export default function Role() {
  const [currentIndex, setCurrentIndex] = useState(null);
  return (
    <Screen style={styles.container}>
      <Header goBack title="Images" searchBar={false} />
      <FlatList
        data={folders}
        keyExtractor={(folder) => folder.id}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  setCurrentIndex(currentIndex === index ? null : index)
                }
                style={styles.folderContainer}
              >
                <Icon
                  backgroundColor={"transparent"}
                  innerSize={60}
                  size={65}
                  style={{ borderRadius: 0, marginBottom: 5 }}
                  name={item.iconName}
                  disabled
                />
                <Text numberOfLines={3} style={styles.label}>
                  {item.label}
                </Text>
              </TouchableOpacity>
              {currentIndex === index && (
                <View>
                  {" "}
                  {item.images.map(({ uri }, index) => {
                    <Image source={{ uri: uri }} />;
                  })}
                </View>
              )}
            </>
          );
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {},
  folderContainer: {
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: customProps.darkOpacity,
    width: 120,
    borderRadius: 10,
  },
  label: {
    ...customProps.font,
    color: customProps.secondaryColor,
    fontSize: 19,
    textTransform: "capitalize",
  },
});
