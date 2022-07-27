import { TouchableOpacity, Image } from "react-native";
import React, { memo } from "react";

function TouchableImage(
  onPress,
  uri,
  imageSize,
  activeIndex,
  spacing,
  index,
  borderColor
) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{ uri: uri }}
        style={{
          width: imageSize ? imageSize : 80,
          height: imageSize ? imageSize : 80,
          borderRadius: 12,
          marginHorizontal: spacing ? spacing : 5,
          borderWidth: index === activeIndex ? 2 : 0,
          borderColor: borderColor ? borderColor : "#fff",
        }}
      />
    </TouchableOpacity>
  );
}

export default TouchableImage;
