import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { imagesApi } from "../../api";
import { Icon } from "../../components";
import { customProps } from "../../config";

export default function DescriptionContainer({ route, navigation }) {
  // ? * -->
  const values = route?.params?.images;
  const { height, width } = Dimensions.get("screen");
  const imageSize = 80;
  const spacing = 11.5;

  // ? * -->
  const [images, setImages] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  // ? * --> Refs
  const scrollerIndexRef = useRef();
  const listIndexRef = useRef();

  // ? * -->
  const setValueOfActiveIndex = (index) => {
    setActiveIndex(index);
    listIndexRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (imageSize + spacing) - imageSize / 2 > width / 2) {
      scrollerIndexRef?.current?.scrollToOffset({
        offset: index * (imageSize + spacing) - width / 2 + imageSize / 2,
        animated: true,
      });
    } else {
      scrollerIndexRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  // ? * -->
  useEffect(() => {
    const fetchImages = async () => {
      const photos = await imagesApi.getImagesFromPixelsServer();
      setImages(photos);
    };
    if (!route.params?.viewImages) return fetchImages();
    setImages(values);
  }, [route.params?.viewImages]);

  return route.params?.viewImages ? (
    <>
      <Icon
        name="close"
        onPress={() => navigation.goBack()}
        backgroundColor={customProps.darkOpacity}
        iconColor={customProps.secondaryColor}
        style={styles.closeIcon}
        size={40}
        innerSize={30}
      />
      <FlatList
        ref={listIndexRef}
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setValueOfActiveIndex(
            Math.floor(e.nativeEvent.contentOffset.x / width)
          );
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.url }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={scrollerIndexRef}
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.scroller}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => setValueOfActiveIndex(index)}>
              <Image
                source={{ uri: item.url }}
                style={{
                  width: imageSize,
                  height: imageSize,
                  borderRadius: 12,
                  marginHorizontal: 5,
                  borderWidth: index === activeIndex ? 2 : 0,
                  borderColor: customProps.secondaryColor,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  ) : (
    <>
      <Icon
        name="backburger"
        onPress={() => navigation.goBack()}
        backgroundColor={customProps.darkOpacity}
        iconColor={customProps.secondaryColor}
        style={styles.closeIcon}
        size={45}
        innerSize={30}
      />
      <FlatList
        ref={listIndexRef}
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setValueOfActiveIndex(
            Math.floor(e.nativeEvent.contentOffset.x / width)
          );
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.src.portrait }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={scrollerIndexRef}
        data={images}
        keyExtractor={(item) => item.id}
        horizontal
        style={styles.scroller}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => setValueOfActiveIndex(index)}>
              <Image
                source={{ uri: item.src.tiny }}
                style={{
                  width: imageSize,
                  height: imageSize,
                  borderRadius: 12,
                  marginHorizontal: 5,
                  borderWidth: index === activeIndex ? 2 : 0,
                  borderColor: customProps.secondaryColor,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    ...customProps.font,
    color: customProps.primaryColorLight,
  },
  scroller: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 55,
    left: 25,
    zIndex: 1,
  },
});
