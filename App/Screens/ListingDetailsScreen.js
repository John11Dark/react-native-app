import { Image, Text, View } from "react-native";

import customProps from "../config/customProps";

export default function ListingDetailsScreen(finished = false) {
  return (
    <View>
      <Image />
      <View>
        <Text style={styles.date}></Text>
        <Text style={styles.title}></Text>
        <Text style={styles.status}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  continuer: {
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
  textContinuer: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  date: {
    color: customProps.primaryColorLightGray,
  },
  status: {
    color: finished === true ? customProps.finished : customProps.notFinished,
  },
  image: {
    width: "100%",
    height: "30%",
  },
});
