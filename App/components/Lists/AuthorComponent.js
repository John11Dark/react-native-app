import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { customProps } from "../../config";

export default function AuthorComponent({
  title,
  subTitle,
  imagePath,
  style,
  onPress,
}) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image resizeMode="cover" source={imagePath} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: customProps.darkOpacity,
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 10,
  },
  title: {
    ...customProps.font,
    fontSize: 35,
    color: customProps.secondaryColor,
    fontWeight: "600",
    marginBottom: 2,
    textTransform: "capitalize",
  },
  subTitle: {
    ...customProps.font,
    fontSize: customProps.mediumTextFontSize,
    color: customProps.primaryColorLightGray,
    textTransform: "capitalize",
  },
});
