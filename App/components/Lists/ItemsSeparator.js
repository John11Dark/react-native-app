import { View } from "react-native";
import customProps from "../../config/customProps";

export default function ItemSeparator({ style }) {
  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: customProps.primaryColorLightGray,
          height: 1,
          borderRadius: 10,
          alignSelf: "center",
          opacity: 0.1,
        },
        style,
      ]}
    ></View>
  );
}
