// Third parties libraries
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

// Project components  and configurations
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
} from "../components/";
import { Styles } from "../config";
import { useAuth } from "../hooks";
import listingData from "./listingData";
import Functions from "./Functions/Functions";

export default function ListingEditScreen() {
  const validationSchema = Yup.object().shape({
    site: Yup.string().required().min(15).label("Title"),
    clientPhoneNumber: Yup.number()
      .required()
      .min(8)
      .label("client phone number"),
    clientFirstName: Yup.string().required().label("client first name"),
    clientLastName: Yup.string().required().label("client last name"),
    clientAddressStreetOne: Yup.string().required().label("Street One"),
    clientAddressLocality: Yup.string().required().label("Locality"),
    email: Yup.string().required().email().min(10).label("Email"),
    initialDate: Yup.date().required().label("initial date"),
    tileType: Yup.object().required().label("Tile type"),
    projectType: Yup.object().required().label("Project Type"),
    poolLocation: Yup.object().required().label("Pool Location"),
    poolLength: Yup.number().required().label("Pool Length"),
    poolWidth: Yup.number().required().label("Pool Width"),
    poolDepthEnd: Yup.number().required().label("Pool Depth End"),
    poolDepthStart: Yup.number().required().label("Pool Depth Start"),
    poolVolume: Yup.number().required().label("Pool Volume"),
    balanceTankLength: Yup.lazy(() => {
      if (!poolType) {
        return Yup.number().required().label("Balance Tank Length");
      }
      return Yup.number().notRequired().label("Balance Tank Length");
    }),
    balanceTankWidth: Yup.lazy(() => {
      if (!poolType) {
        return Yup.number().required().label("Balance Tank Width");
      }
      return Yup.number().notRequired().label("Balance Tank Width");
    }),
    balanceTankDepth: Yup.lazy(() => {
      if (!poolType) {
        return Yup.number().required().label("Balance Tank Depth");
      }
      return Yup.number().notRequired().label("Balance Tank Depth");
    }),
    balanceTankVolume: Yup.lazy(() => {
      if (!poolType) {
        return Yup.number().required().label("Balance Tank Volume");
      }
      return Yup.number().notRequired().label("Balance Tank Volume");
    }),
  });
  // Variables
  const { projectTypeOptions, poolLocationOptions, tileOptions } = listingData;
  const { calculatePoolVolume } = Functions;
  // Hooks
  const [location, setLocation] = useState(null);
  const { user } = useAuth();
  const navigation = useNavigation();
  // States

  ///*--> Application states
  const [error, setError] = useState(null);

  ///*--> Picker states
  const [projectType, setProjectType] = useState(projectTypeOptions[0]);
  const [poolLocation, setPoolLocation] = useState(poolLocationOptions[0]);
  const [poolTile, setPoolTile] = useState(tileOptions[0]);

  ///*--> Pool required options states
  const [poolType, setPoolType] = useState(true);
  const [poolSteps, setPoolSteps] = useState(false);
  const [quotationType, setQuotationType] = useState(true);
  const [indoor, setIndoor] = useState(false);
  const [poolLeaking, setPoolLeaking] = useState(false);
  const [isNewPool, setIsNewPool] = useState(true);

  ///*--> Pool Parameters
  const [poolPerimeter, setPoolPerimeter] = useState("");
  const [poolCopingPerimeter, setPoolCopingPerimeter] = useState("");

  ///*--> Pool parameters states
  const [poolLength, setPoolLength] = useState("");
  const [poolWidth, setPoolWidth] = useState("");
  const [poolDepthStart, setPoolDepthStart] = useState("");
  const [poolDepthEnd, setPoolDepthEnd] = useState("");
  const [poolVolume, setPoolVolume] = useState(0);

  ///*--> balance tank parameters states
  const [poolBalanceTankLength, setPoolBalanceTankLength] = useState("");
  const [balanceTankWidth, setBalanceTankWidth] = useState("");
  const [balanceTankDepth, setBalanceTankDepth] = useState("");
  const [balanceTankVolume, setBalanceTankVolume] = useState(0);

  // submit function

  const handleSubmit = (values) => {
    values.poolVolume = poolVolume.toString();
    values.balanceTankVolume = balanceTankVolume.toString();
    values.location = location;
    setError(null);
    navigation.navigate("Options", values);
  };

  useEffect(() => {
    setPoolVolume(calculatePoolVolume(poolLength, poolWidth, poolDepthStart));
  }, [poolWidth, poolLength, poolDepthStart, poolDepthEnd]);

  useEffect(() => {
    setBalanceTankVolume(
      calculatePoolVolume(poolLength, poolWidth, poolDepthStart)
    );
  }, [poolBalanceTankLength, balanceTankWidth, balanceTankDepth]);
  return (
    <Wrapper>
      <AppForm
        initialValues={{
          site: "",
          clientFirstName: "",
          clientLastName: "",
          clientAddressStreetOne: "",
          clientAddressStreetTwo: "",
          clientAddressLocality: "",
          clientPhoneNumber: "",
          countryCode: "+356",
          email: "",
          initialDate: new Date().toDateString(),
          // pickers
          projectType: projectType,
          poolLocation: poolLocation,
          tileType: poolTile,
          // required options
          poolType: true,
          poolSteps: false,
          quotationType: false,
          indoor: false,
          poolLeaking: false,
          isNewPool: true,
          poolLength: "",
          poolWidth: "",
          poolDepthEnd: "",
          poolDepthStart: "",
          balanceTankLength: "",
          balanceTankWidth: "",
          balanceTankDepth: "",
          poolVolume: poolVolume.toString(),
          balanceTankVolume: balanceTankVolume.toString(),
          status: false,
          user: {
            name: user.name,
            id: user.userId,
            role: user.role,
            image: user.images[0].url,
          },
        }}
        onSubmit={handleSubmit}
        //validationSchema={validationSchema}
      >
        <Text style={Styles.secondaryTextHeroSection}>Quotation 📜 </Text>

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
            name="clientAddressStreetOne"
            icon="map"
            placeholder="Street Address"
            title="Street Address "
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="streetAddressLine1"
          />

          <AppFormField
            name="clientAddressStreetTwo"
            icon="map"
            title="Street address Line 2"
            placeholder="optional"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="streetAddressLine2"
          />

          <AppFormField
            name="clientAddressLocality"
            placeholder="Locality"
            title="Locality"
            icon="map"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="addressCity"
          />

          <DateTimePicker name="initialDate" />

          {/*
           *--> pool required options
           */}

          <CheckBox
            name="isNewPool"
            placeholder="New Pool"
            choiceOne="Yes"
            choiceTwo="No"
            //choiceOne="New"
            //choiceTwo="Refurbishment"
            onPress={(value) => setIsNewPool(value)}
            selected={isNewPool}
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
            selectedItem={projectType}
            onItemSelect={(item) => setProjectType(item)}
            numOfColumns={3}
          />

          <FormPicker
            name="poolLocation"
            icon="progress-question"
            placeholder="Pool Location"
            title="Pool Location"
            selectedItem={poolLocation}
            onItemSelect={(item) => setPoolLocation(item)}
            numOfColumns={3}
            data={poolLocationOptions}
          />

          <FormPicker
            name="tileType"
            icon="progress-question"
            placeholder="Tile Type"
            title="Tile Type"
            selectedItem={poolTile}
            onItemSelect={(item) => setPoolTile(item)}
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
           *-->  Pool parameters
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
            placeholder="ex: 23"
            title="Pool Depth End"
          />

          <AppFormField
            autoCapitalize="none"
            keyboardType="decimal-pad"
            icon="move-resize-variant"
            value={poolVolume.toString()}
            title="Pool Volume"
          />
          {/*
            *--> Balance Tank Parameters
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
                defaultValue={balanceTankVolume.toString()}
                title="Balance Tank Volume"
                getValue={(value) => setBalanceTankVolume(value)}
              />
            </View>
          )}
          <ErrorMessage visible={error} error={error} />
        </View>
        <SubmitButton title={"Next"} iconName={"page-next"} width={250} />
      </AppForm>
      <Map location={(pin) => setLocation(pin)} />
    </Wrapper>
  );
}
