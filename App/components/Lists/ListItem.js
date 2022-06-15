import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import customProps from "../../config/customProps";

let initialAuthor = false;
export default function ListItem({
  title,
  subTitle,
  imagePath,
  IconComponent,
  style,
  onPress,
}) {
  return (
    // Images
    <TouchableHighlight
      underlayColor={customProps.primaryColorDarkOpacity}
      onPress={onPress}
    >
      <View style={[styles.container, style]}>
        {IconComponent}
        {imagePath && <Image source={imagePath} style={styles.image} />}

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
        </View>
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  image: {
    width: initialAuthor ? 100 : 70,
    height: initialAuthor ? 100 : 70,
    margin: 10,
    borderRadius: initialAuthor ? 50 : 35,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: customProps.darkCardBackgroundColor,
    //borderRadius: 10,
    margin: 1,
    padding: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: "100%",
    borderRadius: 15,
  },

  textContainer: {
    marginLeft: 25,
    alignItems: "flex-Start",
  },

  title: {
    fontFamily: customProps.primaryFont,
    fontSize: customProps.largePrimaryTextFontSize,
    color: customProps.primaryColorLight,
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
