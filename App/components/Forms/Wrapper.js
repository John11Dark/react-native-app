import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef } from "react";
import UploadIndicator from "../UploadIndicator";
import Screen from "../Screen";
const Wrapper = ({
  children,
  progress = 0,
  uploadVisible = false,
  onFinish,
  animation = false,
  scrollEnabled = true,
  scrollBarVisible = true,
  paddingTop = 0,
}) => {
  const scrollViewRef = useRef(null);
  return (
    <Screen>
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
};

export default Wrapper;

const styles = StyleSheet.create({});
