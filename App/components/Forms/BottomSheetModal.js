import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { customProps } from "../../config";
import PrimaryButton from "../Buttons/PrimaryButton";

export default function BottomSheetModal({
  ref,
  snapPoints,
  headerTitle,
  visible,
  onClose,
  submit,
}) {
  const animationFall = new Animated.Value(1);

  // ? Functions
  const BottomSheetHeader = () => (
    <View
      style={[styles.BottomSheetHeader, { display: visible ? "flex" : "none" }]}
    >
      <View style={styles.headerLine}></View>
      <Text style={styles.bottomSheetHeaderTitle}>{headerTitle}</Text>
    </View>
  );
  const BottomSheetContent = () => (
    <View
      style={[
        styles.BottomSheetContainer,
        { display: visible ? "flex" : "none" },
      ]}
    >
      <PrimaryButton title={"Submit"} iconName={"post"} handlePress={submit} />
    </View>
  );

  const Ref = useRef(null);
  useEffect(() => {
    if (visible) {
      console.log("if", visible);
      Ref?.current?.snapTo(1);
    } else {
      console.log("Else", visible);
      Ref?.current?.snapTo(0);
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={Ref}
      renderContent={BottomSheetContent}
      renderHeader={BottomSheetHeader}
      initialSnap={0}
      snapPoints={snapPoints}
      callbackNode={animationFall}
      enabledGestureInteraction={true}
      onCloseEnd={onClose}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 500,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    zIndex: 50,
    position: "absolute",
    bottom: 0,
  },
  BottomSheetContainer: {
    width: "100%",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    backgroundColor: customProps.primaryColorLight,
  },
  BottomSheetHeader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: customProps.secondaryColor,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    minHeight: 60,
  },
  bottomSheetHeaderTitle: {
    ...customProps.font,
    fontSize: 30,
    color: customProps.primaryColorLight,
    fontWeight: "800",
  },
  headerLine: {
    alignSelf: "center",
    width: 60,
    height: 1,
    borderRadius: 10,
    backgroundColor: customProps.primaryColorDarkGray,
    opacity: 0.7,
    borderColor: customProps.primaryColorDark,
    marginVertical: 10,
    borderWidth: 3,
  },
});
