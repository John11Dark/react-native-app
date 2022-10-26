import React, { useRef } from "react";
import { StyleSheet, View, Text } from "react-native";

import { customProps } from "../../config";
import Link from "../Buttons/Link";
import Icon from "../Icon";

export default function DetailsContainer({
  label,
  value,
  link,
  onIconPress,
  active,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {!link && <Text style={styles.value}>{value}</Text>}
      {link && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            url={link.url}
            title={link.title}
            type={link.type}
            canCopy={link.canCopy}
            externalUrl={link.externalUrl}
          />
          {onIconPress && (
            <Icon
              iconColor={customProps.secondaryColor}
              name={active ? "arrow-up-drop-circle" : "arrow-down-drop-circle"}
              onPress={() => {
                onIconPress();
              }}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: 2,
    padding: 5,
  },
  label: {
    ...customProps.font,
    color: customProps.secondaryColor,
  },
  value: {
    ...customProps.font,
    fontSize: 18,
    color: customProps.primaryColorLightGray,
    textTransform: "capitalize",
  },
});
