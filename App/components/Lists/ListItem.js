import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Swipable from "react-native-gesture-handler/Swipeable";

import customProps from "../../config/customProps";
export default function ListItem({
  title,
  subTitle,
  imagePath,
  IconComponent,
  style = {},
  onPress,
  textWidth = "100%",
  renderRightActions,
  disabled = false,
  users = false,
  description,
}) {
  return !users ? (
    // Images
    <Swipable renderRightActions={renderRightActions}>
      <TouchableOpacity
        disabled={disabled}
        underlayColor={customProps.primaryColorDarkOpacity}
        onPress={onPress}
      >
        <View style={[styles.container, style.container]}>
          {IconComponent}
          {imagePath && (
            <Image
              source={{ uri: imagePath }}
              style={[
                styles.image,
                { width: 90, height: 90, borderRadius: 45 },
              ]}
            />
          )}
          {/* Text */}
          <View style={[styles.textContainer, { width: textWidth }]}>
            <Text style={[styles.title, style.text]}>{title}</Text>
            {subTitle && (
              <Text style={[styles.subTitle, style.text]}>{subTitle}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipable>
  ) : (
    <TouchableOpacity
      underlayColor={customProps.primaryColorDarkOpacity}
      onPress={onPress}
    >
      <View style={[styles.container, style.container]}>
        <Image
          source={{ uri: imagePath }}
          style={[styles.image, { width: 60, height: 60, borderRadius: 30 }]}
        />

        {/* Text */}
        <View style={[styles.textContainer, { width: textWidth }]}>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={[styles.description]}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
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
    alignSelf: "center",
    width: "100%",
  },

  textContainer: {
    marginLeft: 15,
  },

  title: {
    ...customProps.font,
    fontSize: customProps.largePrimaryTextFontSize,
    color: customProps.primaryColorLight,
    fontWeight: "500",
    marginBottom: 2,
    textTransform: "capitalize",
    flexWrap: "nowrap",
  },
  subTitle: {
    ...customProps.font,
    fontSize: customProps.mediumTextFontSize,
    color: customProps.primaryColorDarkGray,
    textTransform: "capitalize",
  },
  description: {
    ...customProps.font,
    fontSize: 17,
    color: customProps.primaryColorDarkGray,
  },
});
