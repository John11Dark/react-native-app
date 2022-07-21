import { Text, View, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

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
} from "../../components";
import listingData from "./Data/listingData";
//import Functions from "./Functions/Functions";
import { listingsApi } from "../../api";
import { customProps, settings } from "../../config";

export default function ListingEditScreenOptions({ route, navigation }) {
  //console.log(route);
  // ? Variables

  let data = route.params;
  const { validationSchema, Styles } = listingData;
  const snapPoints = useMemo(() => ["40%", "90%"], []);

  // ? hooks

  // ? refs
  const bottomSheetRef = useRef(null);

  // *--> States

  ///*--> Error state
  const [error, setError] = useState(null);

  ///*--> Modal state
  const [modalVisible, setModalVisible] = useState(false);

  ///*-->  Submit animation state
  const [progress, setProgress] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);

  ///*-->

  // ? Functions

  // *--> Options Add Functions
  async function handleSubmit(values, { resetForm }) {
    data = { ...data, ...values };
    bottomSheetRef.current?.present();
  }

  async function handleSubmitRequest(values) {
    values = { ...data, ...values };
    //console.log(values);
    const response = await listingsApi.addListing(values, (value) =>
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
          Package: null,
          numberOfWallInlets: "",
          numberOfSkimmers: "",
          numberOfSumps: "",
          numberOfLights: "",
          spaJets: "",
          counterCurrent: "",
          vacuumPoints: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitRequest}
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
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    ...customProps.font,
    fontSize: 30,
    fontWeight: "900",
    color: customProps.primaryColorLight,
    borderBottomWidth: 2,
    borderColor: customProps.primaryColorLight,
    margin: 20,
    marginTop: 5,
  },
});
