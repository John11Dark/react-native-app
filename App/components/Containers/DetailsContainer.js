import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { customProps } from "../../config";
import Link from "../Buttons/Link";
import Icon from "../Interface/Icon";
export default function DetailsContainer({
  label,
  value,
  link,
  IconComponent,
  checkBox,
  number,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {!link && (
        <View style={styles.flex}>
          <Text
            style={[
              styles.value,
              {
                color: checkBox
                  ? customProps.greenColor
                  : checkBox === false
                  ? customProps.importantIconColor
                  : customProps.primaryColorLightGray,
                textTransform: number ? "none" : "capitalize",
              },
            ]}
          >
            {value}
          </Text>
          {!IconComponent && (checkBox === true || checkBox === false) && (
            <Icon
              name={checkBox ? "check-circle" : "check-circle-outline"}
              disabled
              iconColor={
                checkBox
                  ? customProps.greenColor
                  : customProps.importantIconColor
              }
            />
          )}
          {IconComponent}
        </View>
      )}

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
          {IconComponent}
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
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
