import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import UploadIndicator from "../UploadIndicator";
import Screen from "../Screen";
const Wrapper = ({
  children,
  progress = 0,
  uploadVisible = false,
  onFinish,
  animation = false,
}) => {
  return (
    <Screen>
      <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={"padding"}>
        <ScrollView>
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
