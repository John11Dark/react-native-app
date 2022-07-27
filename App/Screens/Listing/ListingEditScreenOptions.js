import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Wrapper,
  AppForm,
  AppFormField,
  FormImagePicker,
  ItemsListPicker,
  SubmitButton,
  ErrorMessage,
  PrimaryButton,
  DescriptionContainer,
  AppPicker,
} from "../../components";
import listingData from "./Data/listingData";
//import Functions from "./Functions/Functions";
import { listingsApi } from "../../api";
import { customProps, settings } from "../../config";
import BottomSheetModal from "../../components/Forms/BottomSheetModal";

export default function ListingEditScreenOptions({ route, navigation }) {
  // ? Variables

  let data = route.params;
  const { validationSchema, Styles, availablePackages } = listingData;
  const [recommendedPackage, setRecommendedPackage] = useState(
    availablePackages[0]
  );

  // ? hooks

  // ? refs
  const bottomSheetRef = useRef();

  // *--> States

  ///*--> Error state
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState({
    package: { label: "", value: 0, price: 0 },
    options: {},
    totalPrice: 0,
  });

  ///*--> Modal state
  const [modalVisible, setModalVisible] = useState(false);

  ///*-->  Submit animation state
  const [progress, setProgress] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);

  ///*-->

  // *--> Options Add Functions
  async function handleSubmit(values, { resetForm }) {
    data = { ...data, ...values };
    setModalVisible(true);
  }

  async function handleSubmitRequest() {
    setModalVisible(false);
    const response = await listingsApi.addListing(data, (value) =>
      setProgress(value)
    );
    console.log(response);
    if (!response.ok) {
      setUploadVisible(false);
      setError(
        response.data.error
          ? response.data.error
          : "unexpected error occurs\n Please check your internetConnection"
      );
      return alert(
        response.data.error
          ? `Could not post ${values.site} Project.\nPlease try again and check that you have inserted all values correctly`
          : "unexpected error occurs\n Please check your internet Connection and try again"
      );
    }
    setError(null);
    //resetForm();
  }
  // ?use Effects

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
      uploadVisible={uploadVisible}
      onFinish={() => setAnimationFinish(true)}
    >
      <AppForm
        initialValues={{
          images: [],
          options: [],
          Package: recommendedPackage,
          numberOfWallInlets: "",
          numberOfSkimmers: "",
          numberOfSumps: "",
          numberOfLights: "",
          spaJets: "",
          counterCurrent: "",
          vacuumPoints: "",
          description: "",
          totalPrice: totalPrice,
          finalPrice: totalPrice.total,
        }}
        //validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* images input list */}
        <FormImagePicker maxLength={3} name="images" />
        <View style={[Styles.inputContinuer, { marginBottom: 20 }]}>
          <AppFormField
            name="numberOfWallInlets"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="Optional Number"
            title="No. of Wall inlets"
          />
          <AppFormField
            name="numberOfSumps"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="Optional Number"
            title="No. of Sumps"
          />
          <AppFormField
            name="numberOfSkimmers"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="Optional Number"
            title="No. of skimmers"
          />
          <AppFormField
            name="numberOfLights"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="Optional Number"
            title="No. of Lights"
          />
          <AppFormField
            name="spaJets"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="Optional Number"
            title="No. of Spa Jets"
          />
          <AppFormField
            name="counterCurrent"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="Optional Number"
            title="Counter Current"
          />
          <AppFormField
            name="vacuumPoints"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="Optional Number"
            title="Vacuum points"
          />
          {/* Recommended package */}
          <TouchableOpacity style={styles.container}>
            <Text style={styles.title1}>Recommended Package 📦</Text>
            <Text style={styles.label}>Over flow Package </Text>
            <Text style={styles.label}>€ 1200:00 </Text>
          </TouchableOpacity>
          {/* Description */}
          <AppFormField
            name="description"
            autoCapitalize="sentences"
            autoCorrect
            placeholder="Type a description or extra remarks"
            title="Description"
            numberOfLines={5}
            multiline
          />
          {/* Options picker */}
          <ItemsListPicker name="options" />

          {/* Error Message */}
          <ErrorMessage visible={error} error={error} />

          {/* Submit callback event */}
          <SubmitButton title={"Next"} width={250} iconName={"page-next"} />
        </View>
      </AppForm>
      <BottomSheetModal
        data={data}
        visible={modalVisible}
        headerTitle={"Over View"}
        snapPoints={[0, 400, 800]}
        onClose={() => setModalVisible(false)}
        submit={handleSubmitRequest}
      />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    ...customProps.font,
    fontSize: 30,
    fontWeight: "900",
    color: customProps.primaryColorLight,
    borderColor: customProps.primaryColorLight,
    margin: 20,
    marginTop: 5,
  },
  labelName: {
    ...customProps.font,
    fontSize: 21,
    fontWeight: "700",
    color: customProps.primaryColorLightGray,
    textAlign: "left",
    alignSelf: "flex-start",
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  title1: {
    ...customProps.font,
    fontWeight: "700",
    color: customProps.TertiaryColor,
    margin: 5,
    textAlign: "left",
    alignSelf: "flex-start",
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
  },
  flexDirection: {
    width: "100%",
    justifyContent: "flex-start",
    padding: 5,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    ...customProps.font,
    fontSize: 20,
    fontWeight: "800",
    color: customProps.primaryColorLight,
    alignSelf: "flex-start",
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(200,240,210,0.89)",
    shadowColor: customProps.TertiaryColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderTopEndRadius: 25,
    borderBottomStartRadius: 25,
    minHeight: 120,
    overflow: "hidden",
  },
});
