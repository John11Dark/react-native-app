import * as ImagePicker from "expo-image-picker";

import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import customProps from "../config/customProps";

export default function ImageInput({ imageUri, onImageChange, size = 100 }) {
  useEffect(() => {
    const requestPermission = async () => {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) alert("Please grant access permission for media library");
    };
    requestPermission();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onImageChange(result.uri);
    } catch (error) {
      console.error({ ImageError: error });
    }
  };

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onImageChange(null) },
        { text: "No" },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, { height: size, width: size }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <MaterialCommunityIcons name="camera" style={styles.icon} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    ...customProps.ImageContainer,
    borderRadius: 15,
    backgroundColor: customProps.darkCardBackgroundColor,
  },
  icon: {
    fontSize: 40,
    color: customProps.primaryColorLight,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
