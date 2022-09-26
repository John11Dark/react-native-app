import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppForm,
  ErrorMessage,
  PackagePicker,
  PageIndicators,
  SubmitButton,
  Wrapper,
} from "../../components";
import availablePackages from "../../assets/Data/availablePackages";

export default function ListingEditFinalScreen({ route, navigation }) {
  // ? * --> variables
  console.log(availablePackages);
  const data = route?.params;

  // ? * -->  Functions
  function pickTheRecommendedPackage(packages, length, width, depth) {
    const recommendedPackage = 0;
    return recommendedPackage;
  }
  function calcTotalPrice(data, selectedPackage) {
    let totalPrice = 0;
    return totalPrice;
  }

  // ? * -->  States

  ///*-->// Application States
  const [error, setError] = useState(null);

  ///*-->  Submit animation state
  const [progress, setProgress] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);

  /// *-->//  Quotation state
  const [recommendedPackage, setRecommendedPackage] = useState(null);
  const [totalPrice, setTotalPrice] = useState({
    package: { label: "", value: 0, price: 0 },
    options: {},
    totalPrice: 0,
  });

  /// *--> Start Effect
  useEffect(() => {}, []);

  ///*--> Submit Effect
  useEffect(() => {
    if (dataUploaded && animationFinish) {
      setAnimationFinish(false);
      setDataUploaded(false);
      setUploadVisible(false);
    }
  }, [dataUploaded, animationFinish]);
  return (
    <Wrapper
      animation
      progress={progress}
      onFinish={animationFinish}
      uploadVisible={uploadVisible}
    >
      <PageIndicators
        indicatorTwo={{ active: true }}
        indicatorThree={{ active: true }}
        indicatorFour={{ active: true, current: true, error: error }}
      />
      <AppForm>
        <View style={styles.container}>
          <Text>{data.newPool}</Text>
          <PackagePicker
            totalPrice={{ total: 200 }}
            packages={[{}]}
            selectedPackage={{
              id: 0,
              label: "overFlow",
              price: 100,
              filter: { size: 10, price: 10, name: "12kg AVO45" },
            }}
          />
          <SubmitButton title={"Post"} iconName={"post"} />
          <ErrorMessage visible={error} error={error} />
        </View>
      </AppForm>
    </Wrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

// // submit function
// const handleSubmit = async (values, { resetForm }) => {
//   if (balanceTankVolume === 0 && !data.poolType)
//     return Alert.alert(
//       "Balance Tank Volume",
//       "balance tank volume can not be zero please check you inputs or reenter the pool volume again and do not modify the balance tank to be default to 20% of the pool"
//     );
//   if (
//     !data.poolType &&
//     balanceTankVolume.includes("20% of pool volume") &&
//     (poolBalanceTankLength === 0 || poolBalanceTankLength == null) &&
//     (balanceTankWidth === 0 || balanceTankWidth == null) &&
//     (balanceTankDepth === 0 || balanceTankDepth == null)
//   )
//     return Alert.alert(
//       "balance Tank Volume",
//       "Balance tank volume did not receive any parameters so it defaults to 20% of pool volume\n do you want  to proceed? ",
//       [
//         {
//           text: "yes",
//           style: "destructive",
//           onPress: navigation.navigate("Options", values),
//         },
//         {
//           text: "No",
//           style: "cancel",
//         },
//       ]
//     );
//   values.totalVolume = totalVolumeState;
//   values.poolVolume = poolVolume.toString();
//   values.balanceTankVolume = balanceTankVolume.toString();

//   setProgress(0);
//   setUploadVisible(true);
//   const response = await listingsApi.addListing(values, (value) =>
//     setProgress(value)
//   );
//   setAnimationFinish(true);
//   if (!response.ok) {
//     setDataUploaded(true);
//     setError(
//       response?.data?.error != null
//         ? response.data.error
//         : "unexpected error occurs\n Please check your internet connection"
//     );
//     return alert(
//       response?.data?.error != null
//         ? `Could not post ${values.site} Project.\nPlease try again and check that you have inserted all values correctly`
//         : "unexpected error occurs\n Please check your internet connection and try again"
//     );
//   }
//   setDataUploaded(true);
//   setError(null);
//   resetForm();
// };
