import React, { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ImageInput from "../ImageInput";

export default function ImageInputList({
  onRemoveImage,
  onImageAdd,
  uris = [],
}) {
  const scrollViewRef = useRef(null);
  return (
    <View>
      <ScrollView
        horizontal
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >
        {uris.map((uri, index) => (
          <View key={`${index}_${uri}`} style={styles.image}>
            <ImageInput
              imageUri={uri}
              onImageChange={() => onRemoveImage(uri)}
            />
          </View>
        ))}
        <ImageInput onImageChange={(uri) => onImageAdd(uri)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});
