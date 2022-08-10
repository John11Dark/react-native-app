import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import customProps from "../config/customProps";

export default function Icon({
  name,
  size = customProps.primaryIconScaleSize,
  innerSize = size * 0.6,
  backgroundColor = "transparent",
  iconColor = customProps.primaryColorLight,
  style,
  onPress,
  disabled = false,
  onBlur,
  visible = true,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      onBlur={onBlur}
      style={[
        {
          backgroundColor: backgroundColor,
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: "center",
          justifyContent: "center",
        },
        style,
        {
          display: visible ? "flex" : "none",
        },
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={innerSize} />
    </TouchableOpacity>
  );
}
