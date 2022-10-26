import React, { useCallback } from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { customProps } from "../../config";
import Icon from "../Icon";
import { copy } from "../../Functions";

export default function Link({
  url,
  disabled,
  title,
  canCopy,
  type,
  externalUrl,
}) {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      const proceed = async () => await Linking.openURL(url);

      switch (type) {
        case "location:":
          Alert.alert(
            "Location",
            "do you want to view on google maps or copy the email?",
            [
              { text: "cancel", style: "cancel" },
              { text: "View in Maps", onPress: () => proceed() },
              {
                text: "Copy Link to Clipboard",
                onPress: () => copy.toClipboard(url),
              },
              {
                text: "Copy Coordinates to Clipboard",
                onPress: () => copy.toClipboard(externalUrl),
              },
            ],
            {}
          );
          break;
        case "mailto:":
          Alert.alert(
            "Email",
            "do you want to send an email or copy the link?",
            [
              { text: "cancel", style: "cancel" },
              { text: "Send an email", onPress: () => proceed() },
              {
                text: "Copy to Clipboard",
                onPress: () => copy.toClipboard(title),
              },
            ],
            {}
          );
          break;
        case "tel:":
          Alert.alert(
            "Phone Number",
            "do you want to make a call or copy the phone number?",
            [
              { text: "cancel", style: "cancel" },
              { text: "Make a Call", onPress: () => proceed() },
              {
                text: "Copy to Clipboard",
                onPress: () => copy.toClipboard(title),
              },
            ],
            {}
          );
          break;
        default:
          proceed();
      }
    } else {
      Alert.alert(
        "Dolphin Pools App",
        "unsupported url if you are sure that the link is valid contact the support team"
      );
    }
  }, [url]);
  return canCopy ? (
    <View style={styles.container}>
      <TouchableOpacity disabled={disabled} onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>

      <Icon
        name={"content-copy"}
        size={35}
        iconColor={customProps.secondaryColor}
        onPress={() => copy.toClipboard(title)}
      />
    </View>
  ) : (
    <TouchableOpacity disabled={disabled} onPress={handlePress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
  },
  title: {
    ...customProps.font,
    fontSize: 18,
    color: customProps.primaryColor,
  },
});
