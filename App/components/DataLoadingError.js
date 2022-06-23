import React from "react";
import CustomText from "./CustomText";
import SecondaryButton from "./Buttons/SecondaryButton";

const DataLoadingError = ({ onPress, text, visible }) =>
  visible ? (
    <>
      <CustomText>{text}</CustomText>
      <SecondaryButton title="Retry" iconName="update" handlePress={onPress} />
    </>
  ) : null;

export default DataLoadingError;
