import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  Animated,
} from "react-native";
import React, { useState } from "react";
import {
  TriggeringView,
  ImageHeaderScrollView,
} from "react-native-image-header-scroll-view";
import { customProps } from "../../config";

export default function ScrollerView({ children, title, imageUri }) {
  const maximumHight = 320;
  const headerHeight = 100;
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, maximumHight, headerHeight);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 190],
    outputRange: [0, 280],
  });

  const [visible, setVisible] = useState(false);

  // ? * -->  Functions

  // * -->// header text animation value
  const setValue = (value) => {
    scrollY.setValue(value);
    if (value <= 170) {
      setVisible(false);
    } else if (value >= 190) {
      setVisible(true);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={30}
    >
      <ImageHeaderScrollView
        onScroll={(e) => setValue(e.nativeEvent.contentOffset.y)}
        minHeight={headerHeight}
        maxHeight={maximumHight}
        maxOverlayOpacity={0.5}
        minOverlayOpacity={0.3}
        scrollViewBackgroundColor={customProps.primaryColorDark}
        renderHeader={() => (
          <Image
            blurRadius={visible ? 20 : 5}
            style={styles.image}
            source={{ uri: imageUri }}
          />
        )}
        renderForeground={() => (
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}> {title}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.navTitle,
              {
                transform: [{ translateY: translateY }],
                display: visible ? "flex" : "none",
              },
            ]}
          >
            {title}
          </Animated.Text>
        )}
      >
        <TriggeringView>{children}</TriggeringView>
      </ImageHeaderScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {},
  navTitle: {
    ...customProps.font,
    fontWeight: "800",
    fontSize: 30,
    color: customProps.primaryColorLight,
    position: "absolute",
    top: -100,
    textAlign: "center",
    alignSelf: "center",
    maxWidth: 220,
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  headerTitle: {
    ...customProps.font,
    fontWeight: "900",
    fontSize: 50,
    color: customProps.primaryColorLight,
    textAlign: "center",
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  headerTitleBox: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 330,
    opacity: 0.9,
  },
});
