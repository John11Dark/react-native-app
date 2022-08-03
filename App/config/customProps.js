import { Platform } from "react-native";
// Colors

const darkOrLight = (theme) => {
  if (theme === true) {
    return {
      theme: "dark",
      primaryColor: "#50BED2",
      primaryColorDark: "#1E2931",
      primaryColorLight: "#EDEEE4",
      primaryColorLightGray: "#b6abab",
      primaryColorDarkGray: "#678186",
      primaryColorDarkOpacity: "#1e29319a",
      barBackgroundColorOpacity: "#071622d3",
      lightOpacity: "#03000ab6",
      darkOpacity: "#2d404de5",
      secondaryColor: "#E6B11E",
      TertiaryColor: "#00b5a9",
      lineColor: "#EDEEE4",
      darkCardBackgroundColor: "#10191E",
      lightCardBackgroundColor: "#F3F3F3",
      importantIconColor: "tomato",
      greenColor: "#B5C273",
      notFinished: "tomato",
      barBackgroundColor: "#0A1A26",

      // items scaling
      primaryIconScaleSize: 50,
      secondaryIconScaleSize: 35,

      // Fonts
      largePrimaryTextFontSize: Platform.OS === "android" ? 23 : 25.5,
      primaryTextFontSize: Platform.OS === "android" ? 19.5 : 22.5,
      mediumTextFontSize: Platform.OS === "android" ? 18 : 20,
      smallTextFontSize: Platform.OS === "android" ? 14 : 16,
      innerTextFontSize: Platform.OS === "android" ? 18 : 20,
      dateTextFontSize: Platform.OS === "android" ? 13 : 15,

      font: {
        ...Platform.select({
          ios: {
            // Font Sizes
            fontSize: 25,
            fontFamily: "Avenir",
            fontWeight: "500",
          },
          android: {
            fontSize: 18,
            fontFamily: "Roboto",
            fontWeight: "500",
          },
        }),
      },
    };
  } else {
    return {
      theme: dark,
      primaryColor: "#50BED2",
      primaryColorDark: "#1E2931",
      primaryColorLight: "#EDEEE4",
      primaryColorLightOpacity: "#edeee4d2",
      primaryColorLightGray: "#b6abab",
      primaryColorDarkGray: "#678186",
      primaryColorDarkOpacity: "#1e29319a",
      barBackgroundColorOpacity: "#071622d3",
      lightOpacity: "#03000ab6",
      darkOpacity: "#2d404de5",
      secondaryColor: "#E6B11E",
      TertiaryColor: "#00b5a9",
      lineColor: "#EDEEE4",
      darkCardBackgroundColor: "#10191E",
      lightCardBackgroundColor: "#F3F3F3",
      importantIconColor: "tomato",
      greenColor: "#B5C273",
      notFinished: "tomato",
      barBackgroundColor: "#0A1A26",

      // items scaling
      primaryIconScaleSize: 50,
      secondaryIconScaleSize: 35,

      // Fonts
      largePrimaryTextFontSize: Platform.OS === "android" ? 23 : 25.5,
      primaryTextFontSize: Platform.OS === "android" ? 19.5 : 22.5,
      mediumTextFontSize: Platform.OS === "android" ? 18 : 20,
      smallTextFontSize: Platform.OS === "android" ? 14 : 16,
      descriptionTextFontSize: Platform.OS === "android" ? 16 : 18,
      innerTextFontSize: Platform.OS === "android" ? 18 : 20,
      dateTextFontSize: Platform.OS === "android" ? 13 : 15,

      font: {
        ...Platform.select({
          ios: {
            // Font Sizes
            fontSize: 22,
            fontFamily: "Avenir",
            fontWeight: "500",
          },
          android: {
            fontSize: 18,
            fontFamily: "Roboto",
          },
        }),
      },
    };
  }
};

const customProps = darkOrLight(true);

export default customProps;
