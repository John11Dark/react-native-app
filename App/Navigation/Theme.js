import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/customProps";
import customProps from "../config/customProps";

export default Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: customProps.primaryColor,
    background: customProps.primaryColorDark,
  },
};
