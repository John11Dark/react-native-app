import React, { useRef } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import ImageInput from "./ImageInput";

const ImageInputList = ({ onImageRemove, onImageAdd, uris, maxLength }) => {
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
              onImageChange={() => onImageRemove(uri)}
            />
          </View>
        ))}
        <ImageInput
          uriLength={uris.length}
          maxLength={maxLength}
          onImageChange={onImageAdd}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
