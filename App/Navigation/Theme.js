import { DefaultTheme } from "@react-navigation/native";
import customProps from "../config/customProps";

export default Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: customProps.secondaryColor,
    text: customProps.primaryColorLight,
    notification: "red",
    card: customProps.barBackgroundColor,
    border: customProps.primaryColorDark,
    background: customProps.primaryColorDark,
  },
};
