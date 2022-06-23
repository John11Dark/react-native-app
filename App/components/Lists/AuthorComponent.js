import { Image, StyleSheet, Text, View } from "react-native";

import customProps from "../../config/customProps";

export default function AuthorComponent({ title, subTitle, imagePath, style }) {
  return (
    // Images

    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image source={imagePath} style={styles.image} />
      </View>

      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "101%",
    height: "101%",
  },
  imageContainer: {
    width: 250,
    height: 250,
    marginBottom: 15,
    borderRadius: 125,
    borderColor: customProps.secondaryColor,
    borderWidth: 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    //borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
    transform: [{ translateY: 20 }],
    marginVertical: 20,
  },

  title: {
    fontFamily: customProps.font.fontFamily,
    fontSize: 35,
    color: customProps.secondaryColor,
    fontWeight: "600",
    marginBottom: 2,
    textTransform: "capitalize",
  },
  subTitle: {
    fontFamily: customProps.primaryFont,
    fontSize: customProps.mediumTextFontSize,
    color: customProps.primaryColorLightGray,
    textTransform: "capitalize",
  },
});
