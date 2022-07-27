import React, { useEffect, useState } from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import BottomActionSheet from "../Lists/BottomActionSheet";
import Icon from "../Icon";
import { Styles } from "../../config";
import { imagesApi } from "../../api";

export default function ImageInput({
  imageUri,
  onImageChange,
  size = 150,
  borderRadius = 25,
  maxLength,
  uriLength,
}) {
  // ? * --> States
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [showRole, setShowRole] = useState(false);

  // ? * --> Functions

  async function openGallery() {
    try {
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        allowsMultipleSelection: true,
      });
      if (!cancelled) {
        onImageChange(uri);
      }
    } catch (error) {
      console.error({ ImageError: error });
    }
  }

  async function takePhoto() {
    try {
      const { cancelled, uri } = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        aspect: [1, 2],

        allowsMultipleSelection: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!cancelled) {
        onImageChange(uri);
      }
    } catch (error) {
      console.error({ ImageError: error });
    }
  }

  async function role() {
    return Alert.alert(
      "info",
      "This Functionality are not available at the moment"
    );
    try {
      const response = await imagesApi.getImages();
      if (!response.ok) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handlePress() {
    if (!imageUri) {
      setBottomSheetVisible(true);
    } else if (uriLength >= maxLength) {
      console.log("first");
    } else {
      Alert.alert(
        "Delete Image",
        "Are you sure you want to Delete this image?",
        [
          { text: "Cancel" },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              onImageChange(null);
            },
          },
        ]
      );
    }
  }

  // ? * --> Effects
  useEffect(() => {
    const requestPermission = async () => {
      const { granted: camera } = ImagePicker.requestCameraPermissionsAsync();
      const { granted: mediaLibrary } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      //if (!camera) alert(camera);
      if (!mediaLibrary)
        alert("Please grant access permission for media library");
    };
    requestPermission();
  }, []);
  return (
    <>
      <TouchableOpacity
        style={[
          Styles.ImageContainer,
          { height: size, width: size, borderRadius: borderRadius },
        ]}
        onPress={handlePress}
      >
        {imageUri ? (
          <Image
            resizeMode="cover"
            source={{ uri: imageUri }}
            style={{ height: "110%", width: "110%" }}
          />
        ) : (
          <Icon
            name="camera-image"
            disabled
            innerSize={50}
            backgroundColor="transparent"
          />
        )}
      </TouchableOpacity>
      <BottomActionSheet
        buttonsArray={["Take Photo", "Role", "Gallery", "Cancel"]}
        functionsArray={[takePhoto, role, openGallery, undefined]}
        destructiveIndex={undefined}
        onPress={(index) => {
          index ? index() : undefined;
          setBottomSheetVisible(false);
        }}
        title="Image"
        message="Choose how you want to add your image"
        visible={bottomSheetVisible}
      />
    </>
  );
}
