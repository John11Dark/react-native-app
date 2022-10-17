// ? * -->  Third parties libraries
import { View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";

// ? * -->  Project components  and configurations
import listingData from "../Data/listingData";
import {
  Wrapper,
  AppForm,
  AppFormField,
  FormImagePicker,
  ItemsListPicker,
  SubmitButton,
  PageIndicators,
} from "../../../components";
import routes from "../../../Navigation/routes";

// ? * --> main stack
export default function ListingEditScreenOptions({ route, navigation }) {
  // ? Variables

  const data = route.params;
  const { Styles } = listingData;
  const validationSchema = Yup.object().shape({
    description: Yup.string().notRequired().label("Description"),
    images: Yup.array()
      .min(1, "Please select at least on image")
      .max(3, "The maximum is three images"),
    optionalPackages: Yup.array().notRequired().label("Options"),
    numberOfWallInlets: Yup.number()
      .notRequired()
      .label("Number of Wall Inlets"),
    numberOfSkimmers: Yup.number().notRequired().label("Number of Skimmers"),
    numberOfSumps: Yup.number().notRequired().label("Number of Sumps"),
    numberOfLights: Yup.number().required().label("Number of Lights"),
    spaJets: Yup.number().notRequired().label("Spa Jets"),
    counterCurrent: Yup.number().notRequired().label("Counter Current"),
    vacuumPoints: Yup.number().notRequired().label("Vacuum Points"),
  });
  // ? * --> Functions
  function next(values, { resetForm }) {
    const newData = { ...data, ...values };
    navigation.navigate(routes.LISTING_EDIT_FINAL, newData);
    resetForm();
  }
  function calcLightsNumber(length, lightsSize) {
    const value = parseInt(length);
    if (value <= 9) return lightsSize ? 2 : 2 * 4;
    if (value <= 12) return lightsSize ? 3 : 3 * 4;
    if (value <= 15) return lightsSize ? 4 : 4 * 4;
    if (value <= 18) return lightsSize ? 5 : 5 * 4;
    if (value <= 21) return lightsSize ? 6 : 6 * 4;
    if (value <= 24) return lightsSize ? 7 : 7 * 4;
    if (value <= 27) return lightsSize ? 8 : 8 * 4;
    if (value <= 30) return lightsSize ? 9 : 9 * 4;
    if (value >= 33) return lightsSize ? 10 : 10 * 4;
    return lightsSize ? 1 : 4;
  }

  // ? * -->  States

  ///*-->// Application States
  const [error, setError] = useState(null);

  const [lightsSize, setLightsSize] = useState(true);
  const [numberOfLightsState, setNumberOfLights] = useState(1);

  // ? * -->  Effects
  useEffect(() => {
    const numOfLights = calcLightsNumber(data.poolLength, lightsSize);
    setNumberOfLights(numOfLights);
  }, [lightsSize]);
  return (
    <>
      <PageIndicators
        title={`${
          data.newPool
            ? `New  ${data.poolType ? "skimmer" : "overflow"}`
            : `Refurbishment   ${data.poolType ? "skimmer" : "overflow"}`
        } Pool Quotation 📜`}
        indicatorThree={{ active: true, current: true, error: error }}
        indicatorTwo={{ active: true }}
      />
      <Wrapper paddingTop={20}>
        <AppForm
          onSubmit={next}
          validationSchema={validationSchema}
          initialValues={{
            images: [],
            options: [],
            numberOfWallInlets: "",
            numberOfSkimmers: "",
            numberOfSumps: "",
            numberOfLights: numberOfLightsState,
            spaJets: "",
            counterCurrent: "",
            vacuumPoints: "",
            description: "",
            lightsSize: true,
          }}
        >
          {/* images input list */}
          <FormImagePicker maxLength={3} name="images" />
          <View style={Styles.inputContinuer}>
            <AppFormField
              name="numberOfLights"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              placeholder="required Number"
              title="No. of Lights"
              value={numberOfLightsState.toString()}
            />
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

            {/* Submit callback event */}
            <SubmitButton title={"Finish"} iconName={"progress-upload"} />
          </View>
        </AppForm>
      </Wrapper>
    </>
  );
}
