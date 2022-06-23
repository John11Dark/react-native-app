import { Platform } from "react-native-web";

export default {
  // Colors
  primaryColor: "#50BED2",
  primaryColorDark: "#1E2931",
  primaryColorLight: "#EDEEE4",
  primaryColorLightGray: "#b6abab",
  lineColor: "#EDEEE4",

  primaryColorDarkOpacity: "#1e29319a",
  secondaryColor: "#E6B11E",
  TertiaryColor: "#00b5a9",
  darkCardBackgroundColor: "#10191E",
  lightCardBackgroundColor: "#F3F3F3",
  importantIconColor: "tomato",
  notFinished: "red",
  barBackgroundColor: "#0A1A26",

  // items scaling
  primaryIconScaleSize: 50,
  secondaryIconScaleSize: 35,

  // Fonts
  largePrimaryTextFontSize: 25.5,
  primaryTextFontSize: 22.5,
  mediumTextFontSize: 20,
  smallTextFontSize: 16,
  innerTextFontSize: 20,
  dateTextFontSize: 15,

  font: {
    color: "#EDEEE4",
    ...Platform.select({
      ios: {
        // Font Sizes
        fontSize: 25,
        fontFamily: "Avenir",
      },
      android: {
        fontSize: 23,
        fontFamily: "monospace",
      },
    }),
  },
  formField: {
    alignItems: "center",
    backgroundColor: "#1E2931",
    borderColor: "#EDEEE4",
    borderRadius: 5,
    borderWidth: 1.5,
    marginVertical: 6,
    overflow: "hidden",
    padding: 10,
  },
  ImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 15,
    padding: 5,
    margin: 10,
    marginLeft: 15,
  },
  labelStyle: {
    textAlign: "left",
    fontSize: 22,
    color: "#EDEEE4",
    width: "100%",
    padding: 10,
  },
};
