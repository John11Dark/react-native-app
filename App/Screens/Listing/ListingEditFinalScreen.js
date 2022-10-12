import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  PackagePicker,
  PageIndicators,
  SubmitButton,
  Wrapper,
} from "../../components";
import availablePackages from "../../assets/Data/availablePackages";
import { listingsApi } from "../../api";

export default function ListingEditFinalScreen({ route, navigation }) {
  // ? * --> variables
  console.log(availablePackages);
  const data = route?.params;

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

  // ? * -->  Functions
  function pickTheRecommendedPackage(packages, length, width, depth) {
    const recommendedPackage = 0;
    return recommendedPackage;
  }
  function calcTotalPrice(data, selectedPackage) {
    let totalPrice = 0;
    return totalPrice;
  }

  // submit function
  async function handleSubmit(values, { resetForm }) {
    const allData = { ...data, ...values, recommendedPackage, totalPrice };
    setProgress(0);
    setUploadVisible(true);
    const response = await listingsApi.addListing(allData, (value) =>
      setProgress(value)
    );
    setAnimationFinish(true);
    if (!response.ok) {
      setDataUploaded(true);
      setError(
        response?.data?.error != null
          ? response.data.error
          : "unexpected error occurs\n Please check your internet connection"
      );
      return alert(
        response?.data?.error != null
          ? `Could not post ${values.site} Project.\nPlease try again and check that you have inserted all values correctly`
          : "unexpected error occurs\n Please check your internet connection and try again"
      );
    }
    setDataUploaded(true);
    setError(null);
    resetForm();
  }

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
      <AppForm
        initialValues={{
          object: "name",
        }}
        //validationSchema={{}}
        onSubmit={handleSubmit}
      >
        <View style={styles.container}>
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
          <AppFormField name={"object"} placeholder={"extra"} />
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
