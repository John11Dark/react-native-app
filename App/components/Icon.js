import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import customProps from "../config/customProps";

export default function Icon({
  name,
  size = customProps.primaryIconScaleSize,
  innerSize = size * 0.6,
  backgroundColor = customProps.primaryColor,
  iconColor = customProps.primaryColorLight,
  style,
  onPress,
}) {
  return (
    <View
      onPress={onPress}
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
    </View>
  );
}
