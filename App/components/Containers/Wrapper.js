// ? * -->
import React, { useRef } from "react";
import { ScrollView, KeyboardAvoidingView } from "react-native";

// ? * -->
import UploadIndicator from "../Interface/UploadIndicator";
import ActivityIndicator from "../Interface/ActivityIndicator";
import Screen from "./Screen";

// ? * -->
export default function Wrapper({
  children,
  progress = 0,
  uploadVisible = false,
  onFinish,
  animation = false,
  scrollEnabled = true,
  scrollBarVisible = false,
  paddingTop = 0,
  activateIndicator,
}) {
  const scrollViewRef = useRef(null);
  return (
    <Screen>
      {activateIndicator && <ActivityIndicator visible={activateIndicator} />}
      <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={"padding"}>
        <ScrollView
          //onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd()}
          ref={scrollViewRef}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={scrollBarVisible}
          style={{ height: "100%", paddingTop }}
        >
          {/* upload animation */}
          {animation && (
            <UploadIndicator
              progress={progress}
              visible={uploadVisible}
              onFinish={() => onFinish}
            />
          )}
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
