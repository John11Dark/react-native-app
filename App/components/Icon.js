import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import customProps from "../config/customProps";

export default function Icon({
  name,
  size = customProps.primaryIconScaleSize,
  innerSize = size * 0.6,
  backgroundColor = customProps.primaryColor,
  iconColor = customProps.primaryColorLight,
  style,
  onPress,
  disabled = false,
  onBlur,
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
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={innerSize} />
    </TouchableOpacity>
  );
}
