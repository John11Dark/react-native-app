import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ErrorMessage from "../Forms/ErrorMessage";
import customProps from "../../config/customProps";

export default function FormSingleImageInput({
  size = 250,
  borderRadius = 125,
  name,
}) {
  const { errors, touched, values, setFieldValue } = useFormikContext();
  let uri = values[name];

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
        setFieldValue(name, [result.uri]);
      }
    } catch (error) {
      console.error({ ImageError: error });
    }
  };

  const handlePress = () => {
    if (!uri[0]) {
      selectImage();
    } else {
      Alert.alert(
        "Change Image",
        "Are you sure you want to change this image?",
        [{ text: "Yes", onPress: () => selectImage() }, { text: "No" }]
      );
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View
          style={[
            styles.container,
            { height: size, width: size, borderRadius: borderRadius },
          ]}
        >
          {uri[0] ? (
            <Image
              resizeMode="cover"
              source={{ uri: uri[0] }}
              style={styles.image}
            />
          ) : (
            <MaterialCommunityIcons name="account" style={styles.icon} />
          )}
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...customProps.ImageContainer,
    borderRadius: 15,
    backgroundColor: customProps.darkCardBackgroundColor,
  },
  icon: {
    fontSize: 180,
    color: customProps.secondaryColor,
  },
  image: {
    height: "110%",
    width: "110%",
  },
});
