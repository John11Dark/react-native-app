import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";

import colors from "../config/customProps";
import { Icon, Screen } from "../components";
export default function ViewImage({ route, navigation }) {
  const images = route.params;
  const { width } = Dimensions.get("window");
  const height = width * 0.6;
  // handle delete list
  const handleDelete = () => {
    Alert.alert(
      "Delete Image",
      `Are you sure you want to permanently delete this image?`,
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            Alert.alert("Info", `Image has been deleted`);
            //listingsApi.deleteList(values.id);
          },
        },
        { text: "No", style: "cancel" },
      ]
    );
  };
  return (
    <Screen style={styles.container}>
      <View style={styles.actionIconContainer}>
        <Icon
          name="close"
          onPress={() => navigation.goBack()}
          backgroundColor="transparent"
          iconColor={colors.secondaryColor}
          innerSize={45}
        />
        <Icon
          name="trash-can-outline"
          backgroundColor="transparent"
          iconColor={colors.importantIconColor}
          innerSize={42}
          onPress={handleDelete}
        />
      </View>
      <ScrollView
        decelerationRate={"fast"}
        snapToInterval={width}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        horizontal
      >
        {images.map((image, index) => (
          <Image
            style={{
              height: "100%",
              width: width,
            }}
            resizeMode="contain"
            key={index}
            source={{ uri: image.url }}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actionIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 25,
    paddingBottom: 0,
    zIndex: 5,
  },
});

// import React from "react";
// import { Dimensions, Image, StyleSheet, View } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";
// import Animated, {
//   add,
//   clockRunning,
//   cond,
//   debug,
//   divide,
//   eq,
//   floor,
//   not,
//   set,
//   useCode,
// } from "react-native-reanimated";
// import {
//   snapPoint,
//   timing,
//   useClock,
//   usePanGestureHandler,
//   useValue,
// } from "react-native-redash";

// const { width, height } = Dimensions.get("window");

// const snapPoints = assets.map((_, i) => i * -width);

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "black",
//   },
//   pictures: {
//     width: width * assets.length,
//     height,
//     flexDirection: "row",
//   },
//   picture: {
//     width,
//     height,
//     overflow: "hidden",
//   },
//   image: {
//     ...StyleSheet.absoluteFillObject,
//     width: undefined,
//     height: undefined,
//   },
// });

// export default function ViewImage({ route, navigation }) {
//   const assets = route.params;
//   const clock = useClock();
//   const index = useValue(0);
//   const offsetX = useValue(0);
//   const translateX = useValue(0);
//   const { gestureHandler, state, velocity, translation } =
//     usePanGestureHandler();
//   const to = snapPoint(translateX, velocity.x, snapPoints);
//   useCode(
//     () => [
//       cond(eq(state, State.ACTIVE), [
//         set(translateX, add(offsetX, translation.x)),
//       ]),
//       cond(eq(state, State.END), [
//         set(translateX, timing({ clock, from: translateX, to })),
//         set(offsetX, translateX),
//         cond(not(clockRunning(clock)), [
//           set(index, floor(divide(translateX, -width))),
//           debug("index", index),
//         ]),
//       ]),
//     ],
//     []
//   );
//   return (
//     <View style={styles.container}>
//       <PanGestureHandler {...gestureHandler}>
//         <Animated.View style={StyleSheet.absoluteFill}>
//           <Animated.View
//             style={[styles.pictures, { transform: [{ translateX }] }]}
//           >
//             {assets.map((source, index) => (
//               <View key={index} style={styles.picture}>
//                 <Image style={styles.image} source={{ uri: source.url }} />
//               </View>
//             ))}
//           </Animated.View>
//         </Animated.View>
//       </PanGestureHandler>
//     </View>
//   );
// }
