// Third parties libraries
import React, { useEffect, useState } from "react";
import { Text, View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

// Project components  and configurations
import { Styles, customProps } from "../../config";
import { useAuth } from "../../hooks";
import { listingsApi } from "../../api";
import listingData from "./Data/listingData";
import Functions from "./Functions/Functions";
import {
  AppForm,
  AppFormField,
  FormPicker,
  SubmitButton,
  ErrorMessage,
  CheckBox,
  Map,
  Wrapper,
  DateTimePicker,
  FormImagePicker,
  ItemsListPicker,
} from "../../components";

export default function ListingEditScreen() {
  const validationSchema = Yup.object().shape({
    site: Yup.string().required().min(15).label("Title"),
    clientPhoneNumber: Yup.number()
      .required()
      .min(8)
      .label("client phone number"),
    clientFirstName: Yup.string().required().label("client first name"),
    clientLastName: Yup.string().required().label("client last name"),
    streetLineOne: Yup.string().required().label("Street One"),
    locality: Yup.object().required().label("Locality"),
    email: Yup.string().required().email().min(8).label("Email"),
    initialDate: Yup.date().required().label("initial date"),
    tileType: Yup.object().required().label("Tile type"),
    projectType: Yup.object().required().label("Project Type"),
    poolLocation: Yup.object().required().label("Pool Location"),
    poolLength: Yup.number().required().label("Pool Length"),
    poolWidth: Yup.number().required().label("Pool Width"),
    poolDepthEnd: Yup.number().notRequired().label("Pool Depth End"),
    poolDepthStart: Yup.number().required().label("Pool Depth Start"),
    poolVolume: Yup.number().notRequired().label("Pool Volume"),
    balanceTankLength: Yup.number().notRequired().label("Balance Tank Length"),
    balanceTankWidth: Yup.number().notRequired().label("Balance Tank Width"),
    balanceTankDepth: Yup.number().notRequired().label("Balance Tank Depth"),
    //
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
    numberOfLights: Yup.number().notRequired().label("Number of Lights"),
    spaJets: Yup.number().notRequired().label("Spa Jets"),
    counterCurrent: Yup.number().notRequired().label("Counter Current"),
    vacuumPoints: Yup.number().notRequired().label("Vacuum Points"),
    // balanceTankLength: Yup.lazy(() => {
    //   if (!poolType) {
    //     return Yup.number().required().label("Balance Tank Length");
    //   }
    //   return Yup.number().notRequired().label("Balance Tank Length");
    // }),
    // balanceTankWidth: Yup.lazy(() => {
    //   if (!poolType) {
    //     return Yup.number().required().label("Balance Tank Width");
    //   }
    //   return Yup.number().notRequired().label("Balance Tank Width");
    // }),
    // balanceTankDepth: Yup.lazy(() => {
    //   if (!poolType) {
    //     return Yup.number().required().label("Balance Tank Depth");
    //   }
    //   return Yup.number().notRequired().label("Balance Tank Depth");
    // }),
  });

  // Variables
  const {
    projectTypeOptions,
    poolLocationOptions,
    tileOptions,
    localites,
    availablePackages,
  } = listingData;

  const { calculatePoolVolume } = Functions;

  // Hooks
  const [location, setLocation] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();

  // ? * -->  States

  ///*--> Application states
  const [error, setError] = useState(null);

  ///  *-->// Pool required options states
  const [poolType, setPoolType] = useState(true);
  const [poolSteps, setPoolSteps] = useState(false);
  const [quotationType, setQuotationType] = useState(true);
  const [indoor, setIndoor] = useState(false);
  const [poolLeaking, setPoolLeaking] = useState(false);
  const [newPool, setNewPool] = useState(true);

  ///  *-->// Pool parameters states
  const [poolLength, setPoolLength] = useState("");
  const [poolWidth, setPoolWidth] = useState("");
  const [poolDepthStart, setPoolDepthStart] = useState("");
  const [poolDepthEnd, setPoolDepthEnd] = useState("");
  const [poolVolume, setPoolVolume] = useState(0);

  ///  *-->// balance tank parameters states
  const [poolBalanceTankLength, setPoolBalanceTankLength] = useState("");
  const [balanceTankWidth, setBalanceTankWidth] = useState("");
  const [balanceTankDepth, setBalanceTankDepth] = useState("");
  const [balanceTankVolume, setBalanceTankVolume] = useState(0);

  ///  *-->// Pool Parameters
  const [poolPerimeter, setPoolPerimeter] = useState("");
  const [poolCopingPerimeter, setPoolCopingPerimeter] = useState("");

  const [totalVolumeState, setTotalVolume] = useState(0);

  const [totalPrice, setTotalPrice] = useState({
    package: { label: "", value: 0, price: 0 },
    options: {},
    totalPrice: 0,
  });

  const [recommendedPackage, setRecommendedPackage] = useState(
    availablePackages[0]
  );
  ///*-->  Submit animation state
  const [progress, setProgress] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);

  // ? * --> Functions

  // submit function
  const handleSubmit = async (values, { resetForm }) => {
    if (balanceTankVolume === 0 && !poolType)
      return Alert.alert(
        "Balance Tank Volume",
        "balance tank volume can not be zero please check you inputs or reenter the pool volume again and do not modify the balance tank to be default to 20% of the pool"
      );
    if (
      !poolType &&
      balanceTankVolume.includes("20% of pool volume") &&
      (poolBalanceTankLength === 0 || poolBalanceTankLength == null) &&
      (balanceTankWidth === 0 || balanceTankWidth == null) &&
      (balanceTankDepth === 0 || balanceTankDepth == null)
    )
      return Alert.alert(
        "balance Tank Volume",
        "Balance tank volume did not receive any parameters so it defaults to 20% of pool volume\n do you want  to proceed? ",
        [
          {
            text: "yes",
            style: "destructive",
            onPress: navigation.navigate("Options", values),
          },
          {
            text: "No",
            style: "cancel",
          },
        ]
      );
    values.totalVolume = totalVolumeState;
    values.poolVolume = poolVolume.toString();
    values.balanceTankVolume = balanceTankVolume.toString();
    values.location = location;

    setProgress(0);
    setUploadVisible(true);
    const response = await listingsApi.addListing(values, (value) =>
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
    //resetForm();
  };

  // ? * --> use Effects

  ///*--> Submit Effect
  useEffect(() => {
    if (dataUploaded && animationFinish) {
      setAnimationFinish(false);
      setDataUploaded(false);
      setUploadVisible(false);
    }
  }, [dataUploaded, animationFinish]);

  // ? * -->
  useEffect(() => {
    if (poolType) {
      const { volume, totalVolume } = calculatePoolVolume(
        poolType,
        poolLength,
        poolWidth,
        poolDepthStart,
        poolDepthEnd
      );
      setPoolVolume(volume);
      setTotalVolume(totalVolume);
    }
  }, [poolWidth, poolLength, poolDepthStart, poolDepthEnd, poolType]);

  // ? * -->
  useEffect(() => {
    if (poolType) return;
    if (!poolType) {
      const { totalVolume, volume, balanceVolume } = calculatePoolVolume(
        poolType,
        poolWidth,
        poolLength,
        poolDepthStart,
        poolDepthEnd,
        poolBalanceTankLength,
        balanceTankWidth,
        balanceTankDepth
      );
      setBalanceTankVolume(balanceVolume);
      setPoolVolume(volume);
      setTotalVolume(totalVolume);
    }
  }, [
    poolType,
    poolWidth,
    poolLength,
    poolDepthStart,
    poolDepthEnd,
    poolBalanceTankLength,
    balanceTankWidth,
    balanceTankDepth,
  ]);

  // ? * -->
  useEffect(() => {
    setBalanceTankVolume(
      calculatePoolVolume(poolLength, poolWidth, poolDepthStart)
    );
  }, [poolCopingPerimeter, poolPerimeter]);

  return (
    <Wrapper
      animation
      progress={progress}
      uploadVisible={uploadVisible}
      onFinish={() => setAnimationFinish(true)}
    >
      <AppForm
        initialValues={{
          site: "site name new site",
          clientFirstName: "John",
          clientLastName: "Muller",
          streetLineOne: "StreetOne",
          streetLineTwo: "",
          locality: undefined,
          clientPhoneNumber: "79230096",
          countryCode: "+356",
          email: "email@gm.com",
          initialDate: new Date().toDateString(),
          // pickers
          projectType: undefined,
          poolLocation: undefined,
          tileType: undefined,
          // required options
          poolType: true,
          poolSteps: false,
          quotationType: false,
          indoor: false,
          poolLeaking: false,
          newPool: true,
          poolLength: "",
          poolWidth: "",
          poolDepthEnd: "",
          poolDepthStart: "",
          copingParameter: "",
          poolParameter: "",
          balanceTankLength: "",
          balanceTankWidth: "",
          balanceTankDepth: "",
          poolVolume: "",
          balanceTankVolume: "",
          status: false,
          user: {
            name: user.name,
            id: user.userId,
            role: user.role,
            image: user.images[0].url,
          },
          images: [],
          options: [],
          selectedPackage: recommendedPackage,
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
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Text style={Styles.secondaryTextHeroSection}>Quotation 📜 </Text>
        <FormImagePicker maxLength={3} name="images" />
        <View style={Styles.inputContinuer}>
          {/*
           *--> Project details
           */}

          <AppFormField
            name="site"
            title={"Site"}
            placeholder="Site"
            icon={"format-title"}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <AppFormField
            name="clientFirstName"
            placeholder="First Name"
            title={"First Name"}
            icon={"account-box"}
            autoCapitalize="words"
            textContentType="name"
            autoCorrect={false}
          />

          <AppFormField
            name="clientLastName"
            placeholder="Last Name"
            title={"Last Name"}
            icon={"account-box"}
            autoCapitalize="words"
            autoCorrect={false}
            textContentType="name"
          />

          <AppFormField
            name="email"
            title="Email Address"
            placeholder="Email"
            icon="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
          />

          <AppFormField
            name="clientPhoneNumber"
            icon="cellphone"
            title="Phone Number"
            placeholder="79230096"
            keyboardType="numeric"
            textContentType="telephoneNumber"
            autoCapitalize="none"
            maxLength={8}
            autoCorrect={false}
          />

          <AppFormField
            name="streetLineOne"
            icon="map"
            placeholder="Street Address"
            title="Street Address "
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="streetAddressLine1"
          />

          <AppFormField
            name="streetLineTwo"
            icon="map"
            title="Street address Line 2"
            placeholder="optional"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="streetAddressLine2"
          />

          <FormPicker
            name="locality"
            placeholder="Locality"
            title="Locality"
            icon="city"
            data={localites.Malta}
            numOfColumns={3}
          />

          <DateTimePicker name="initialDate" />

          {/*
           // ? * --> pool required options
           */}

          <CheckBox
            name="newPool"
            placeholder="New Pool"
            choiceOne="Yes"
            choiceTwo="No"
            //choiceOne="New"
            //choiceTwo="Refurbishment"
            onPress={(value) => setNewPool(value)}
            selected={newPool}
          />

          <CheckBox
            name="quotationType"
            placeholder="Quotation Type"
            choiceOne="Domestic"
            choiceTwo="Commercial"
            width={160}
            onPress={(value) => setQuotationType(value)}
            selected={quotationType}
          />

          <FormPicker
            name="projectType"
            icon="progress-question"
            placeholder="Project Type"
            title="Project type"
            data={projectTypeOptions}
            numOfColumns={3}
          />

          <FormPicker
            name="poolLocation"
            icon="progress-question"
            placeholder="Pool Location"
            title="Pool Location"
            numOfColumns={3}
            data={poolLocationOptions}
          />

          <FormPicker
            name="tileType"
            icon="progress-question"
            placeholder="Tile Type"
            title="Tile Type"
            numOfColumns={3}
            data={tileOptions}
          />

          <CheckBox
            name="indoor"
            placeholder="indoor"
            choiceOne="Yes"
            choiceTwo="No"
            onPress={(value) => setIndoor(value)}
            selected={indoor}
            disabled={false}
          />

          <CheckBox
            name="poolSteps"
            placeholder="Pool Steps"
            choiceOne="Yes"
            choiceTwo="No"
            onPress={(value) => setPoolSteps(value)}
            selected={poolSteps}
          />

          <CheckBox
            name="poolType"
            placeholder="Pool Type"
            choiceOne="Skimmer"
            choiceTwo="OverFlow"
            width={160}
            onPress={(value) => setPoolType(value)}
            selected={poolType}
          />

          {/* 
           // ? * -->  Pool parameters
           */}

          <AppFormField
            name="poolLength"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            getValue={(value) => setPoolLength(value)}
            placeholder="ex: 23"
            title="pool Length"
          />

          <AppFormField
            name="poolWidth"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            placeholder="ex: 23"
            title="Pool Width"
            getValue={(value) => setPoolWidth(value)}
          />

          <AppFormField
            name="poolDepthStart"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            getValue={(value) => setPoolDepthStart(value)}
            placeholder="ex: 23"
            title="Pool Depth Start"
          />

          <AppFormField
            name="poolDepthEnd"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            getValue={(value) => setPoolDepthEnd(value)}
            placeholder="Optional"
            title="Pool Depth End"
          />

          <AppFormField
            //  Todo: set pool volume
            // ? * -->  name="poolVolume"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            value={poolVolume.toString()}
            title="Pool Volume"
          />

          <AppFormField
            name="copingPerimeter"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            getValue={(value) => setPoolCopingPerimeter(value)}
            placeholder="ex: 23"
            title="Coping Perimeter"
          />
          <AppFormField
            name="poolPerimeter"
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            getValue={(value) => setPoolPerimeter(value)}
            placeholder="ex: 23"
            title="Pool Perimeter"
          />
          {/*
            // ? * --> Balance Tank Parameters
            if poolType === "Overflow"?    
          */}
          {!poolType && (
            <View style={{ width: "100%" }}>
              <CheckBox
                name="poolLeaking"
                placeholder="Pool Leaking"
                choiceOne="Yes"
                choiceTwo="No"
                onPress={setPoolLeaking}
                selected={poolLeaking}
              />
              <AppFormField
                name="balanceTankLength"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                title="Balance Tank Length"
                getValue={(value) => setPoolBalanceTankLength(value)}
              />
              <AppFormField
                name="balanceTankWidth"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                title="Balance Tank Width"
                getValue={(value) => setBalanceTankWidth(value)}
              />
              <AppFormField
                name="balanceTankDepth"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                title="Balance Tank Depth"
                getValue={(value) => setBalanceTankDepth(value)}
              />
              <AppFormField
                name="balanceTankVolume"
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                value={balanceTankVolume.toString()}
                title="Balance Tank Volume"
                numberOfLines={3}
                multiline
                //getValue={(value) => setBalanceTankVolume(value)}
              />
            </View>
          )}

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
          {/* Recommended package */}
          <TouchableOpacity style={styles.container}>
            <Text style={styles.title1}>Recommended Package 📦</Text>
            <Text style={styles.label}>Over flow Package </Text>
            <Text style={styles.label}>€ 1200:00 </Text>
          </TouchableOpacity>
          <ErrorMessage visible={error} error={error} />
        </View>
        <SubmitButton title={"Post"} iconName={"post"} width={250} />
        <Map view location={(pin) => setLocation(pin)} />
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
