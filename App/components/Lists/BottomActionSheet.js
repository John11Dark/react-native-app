import React, { useEffect, useRef } from "react";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import { customProps } from "../../config";

export default function DescriptionContainer({
  buttonsArray = [],
  title = "",
  destructiveIndex,
  functionsArray = [],
  onPress,
  visible,
  message,
  otherProps,
}) {
  const sheetRef = useRef();

  useEffect(() => {
    if (visible) sheetRef.current.show();
  }, [visible]);

  return (
    <ActionSheet
      ref={sheetRef}
      title={title}
      options={buttonsArray}
      cancelButtonIndex={buttonsArray.length - 1}
      destructiveButtonIndex={destructiveIndex}
      onPress={(index) => onPress(functionsArray[index])}
      tintColor={customProps.TertiaryColor}
      theme="ios"
      userInterfaceStyle={customProps.theme}
      message={message}
      {...otherProps}
    />
  );
}
