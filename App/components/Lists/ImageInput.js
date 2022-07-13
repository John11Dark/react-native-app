import React, { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Styles } from "../../config";

export default function ImageInput({
  imageUri,
  onImageChange,
  size = 150,
  borderRadius = 25,
  maxLength,
  uriLength,
}) {
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
      if (!result.cancelled) {
        onImageChange(result.uri);
      }
    } catch (error) {
      console.error({ ImageError: error });
    }
  };

  const handlePress = () => {
    if (uriLength >= maxLength)
      return Alert.alert(
        "Image input",
        "You have reached the maximum images (3)"
      );
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert(
        "Delete Image",
        "Are you sure you want to Delete this image?",
        [
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              onImageChange(null);
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.container,
          { height: size, width: size, borderRadius: borderRadius },
        ]}
      >
        {imageUri ? (
          <Image
            resizeMode="cover"
            source={{ uri: imageUri }}
            style={styles.image}
          />
        ) : (
          <MaterialCommunityIcons name="camera-image" style={styles.icon} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Styles.ImageContainer,
    borderRadius: 15,
    backgroundColor: Styles.colors.darkCardBackgroundColor,
  },
  icon: {
    fontSize: 40,
    color: Styles.colors.primaryColorLight,
  },
  image: {
    height: "110%",
    width: "110%",
  },
});
