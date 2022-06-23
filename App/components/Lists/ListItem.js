import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

import customProps from "../../config/customProps";

export default function ListItem({
  title,
  subTitle,
  imagePath,
  IconComponent,
  styleParameter,
  onPress,
}) {
  return (
    // Images
    <TouchableOpacity
      underlayColor={customProps.primaryColorDarkOpacity}
      onPress={onPress}
    >
      <View style={[styles.container, styleParameter]}>
        {IconComponent}
        {imagePath && <Image source={imagePath} style={styles.image} />}

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={[styles.title, styleParameter]}>{title}</Text>
          {subTitle && (
            <Text style={[styles.subTitle, styleParameter]}>{subTitle}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: customProps.darkCardBackgroundColor,
    borderRadius: 10,
    margin: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
  },

  textContainer: {
    marginLeft: 25,
    alignItems: "flex-start",
    width: "100%",
  },

  title: {
    fontFamily: customProps.font.fontFamily,
    fontSize: customProps.largePrimaryTextFontSize,
    color: customProps.primaryColorLight,
    fontWeight: "500",
    marginBottom: 2,
    textTransform: "capitalize",
  },
  subTitle: {
    fontFamily: customProps.font.fontFamily,
    fontSize: customProps.mediumTextFontSize,
    color: customProps.primaryColorLightGray,
    textTransform: "capitalize",
  },
});
