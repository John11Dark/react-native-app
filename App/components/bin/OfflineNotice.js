// import { StyleSheet, View } from "react-native";

// import Constants from "expo-constants";
// import React from "react";
// import Text from "./Text";
// import colors from "../config/colors";
// import { useNetInfo } from "@react-native-community/netinfo";

// const OfflineNotice = () => {
//   const { type, isInternetReachable } = useNetInfo();

//   if (type !== "unknown" && isInternetReachable === false) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>No Internet Connection</Text>
//       </View>
//     );
//   }

//   return null;
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     backgroundColor: colors.primary,
//     height: 50,
//     justifyContent: "center",
//     position: "absolute",
//     top: Constants.statusBarHeight,
//     left: 0,
//     width: "100%",
//     zIndex: 1,
//   },
//   text: {
//     color: colors.white,
//   },
// });

// export default OfflineNotice;
