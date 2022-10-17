// ? * -->  Application
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import * as Location from "expo-location";

// ? * -->  Application
import {
  SubmitButton,
  Wrapper,
  CheckBox,
  AppForm,
  AppFormField,
  FormPicker,
  Map,
  DateTimePicker,
  PageIndicators,
} from "../../../components";
import { useAuth } from "../../../hooks";
import { customProps, Styles } from "../../../config";
import routes from "../../../Navigation/routes";
import listingData from "../Data/listingData";

// ? * --> main stack
export default function ListingEditMain({ navigation }) {
  // ? * -->  Variables
  const { projectTypeOptions, poolLocationOptions, tileOptions, localites } =
    listingData;

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
  });

  // ? * --> Functions
  async function next(values, { resetForm }) {
    const data = { location: location, ...values };
    navigation.navigate(routes.LISTING_EDIT, data);
    console.log(data.location);
    resetForm();
  }
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setLocation({
        latitude,
        longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      });
    } catch (error) {
      console.error(error);
    }
  };
  // ? * -->  Hooks

  const [location, setLocation] = useState(false);
  const { user } = useAuth();

  // ? * -->  States

  /// *-->// application states
  const [error, setError] = useState(false);

  ///  *-->// Pool required options states
  const [poolType, setPoolType] = useState(true);
  const [poolSteps, setPoolSteps] = useState(false);
  const [quotationType, setQuotationType] = useState(true);
  const [indoor, setIndoor] = useState(false);
  const [newPool, setNewPool] = useState(true);
  const [poolForm, setPoolForm] = useState(true);
  const [poolLeaking, setPoolLeaking] = useState(false);
  const [whiteGoodsOnly, setWhiteGoodsOnly] = useState(false);
  const [extraLights, setExtraLights] = useState(false);
  const [extra, setExtra] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);
  if (error) console.log("main error", error);
  return (
    <>
      <PageIndicators
        title={"Quotation"}
        indicatorOne={{ active: true, error: error, current: true }}
      />
      <Wrapper paddingTop={20}>
        <AppForm
          initialValues={{
            // background process
            user: {
              name: user.name,
              id: user.userId,
              role: user.role,
              image: user.image[0].url,
            },
            status: false,

            // project data

            site: "site name new site",
            clientFirstName: "John",
            clientLastName: "Muller",
            streetLineOne: "StreetOne",
            streetLineTwo: "",
            locality: localites.Malta[1],
            clientPhoneNumber: "79230096",
            countryCode: "+356",
            email: "email@gm.com",
            initialDate: new Date().toDateString(),

            // pickers
            projectType: projectTypeOptions[0],
            poolLocation: poolLocationOptions[0],
            tileType: tileOptions[0],

            // required options
            poolType: true,
            poolSteps: false,
            quotationType: false,
            indoor: false,
            poolLeaking: false,
            newPool: true,
            whiteGoodsOnly: false,
            extraLights: false,
            extra: false,
          }}
          onSubmit={next}
          validationSchema={validationSchema}
        >
          {/* Design */}
          <View style={styles.container}>
            <Image
              source={require("../../../assets/Images/heroImages/HeaderLogoHigh.png")}
              style={styles.image}
            />

            <Text style={styles.description}>
              {" "}
              Make sure that all data are inserted correctly before moving to
              the next page, overwise all data will be lost !
            </Text>
          </View>

          {/* Input data */}
          <View style={Styles.inputContinuer}>
            {/*
             *--> Client details
             */}
            <Map view location={(pin) => setLocation(pin)} />
            <AppFormField
              name="site"
              title={"Site"}
              placeholder="Site"
              icon={"format-title"}
              autoCapitalize="words"
              autoCorrect={false}
              setError={(fieldError) => setError(fieldError)}
            />

            <AppFormField
              name="clientFirstName"
              setError={(fieldError) => setError(fieldError)}
              placeholder="First Name"
              title={"First Name"}
              icon={"account-box"}
              autoCapitalize="words"
              textContentType="name"
              autoCorrect={false}
            />

            <AppFormField
              name="clientLastName"
              setError={(fieldError) => setError(fieldError)}
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
              setError={(fieldError) => setError(fieldError)}
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
              setError={(fieldError) => setError(fieldError)}
              icon="map"
              placeholder="Street Address"
              title="Street Address "
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="streetAddressLine1"
            />

            <AppFormField
              name="streetLineTwo"
              setError={(fieldError) => setError(fieldError)}
              icon="map"
              title="Street address Line 2"
              placeholder="optional"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="streetAddressLine2"
            />

            <FormPicker
              name="locality"
              setError={(fieldError) => setError(fieldError)}
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
              name="Form"
              placeholder="Pool Form"
              choiceOne="Free form"
              choiceTwo="Rectangle"
              onPress={(value) => setPoolForm(value)}
              selected={poolForm}
              width={160}
            />
            <CheckBox
              choiceOne={"Yes"}
              choiceTwo={"No"}
              name={"whiteGoodsOnly"}
              placeholder={"White Goods Only"}
              onPress={() => setWhiteGoodsOnly(!whiteGoodsOnly)}
              selected={whiteGoodsOnly}
            />
            <CheckBox
              choiceOne={"Yes"}
              choiceTwo={"No"}
              name={"extraLights"}
              placeholder={"Extra lights"}
              onPress={() => setExtraLights(!extraLights)}
              selected={extraLights}
            />
            <CheckBox
              choiceOne={"Yes"}
              choiceTwo={"No"}
              name={"extra"}
              placeholder={"Extra ....?"}
              onPress={() => setExtra(!extra)}
              selected={extra}
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
            <CheckBox
              name="poolType"
              placeholder="Pool Type"
              choiceOne="Skimmer"
              choiceTwo="OverFlow"
              width={160}
              onPress={(value) => setPoolType(value)}
              selected={poolType}
            />

            {!poolType && (
              <CheckBox
                name="poolLeaking"
                placeholder="Pool Leaking"
                choiceOne="Yes"
                choiceTwo="No"
                onPress={setPoolLeaking}
                selected={poolLeaking}
              />
            )}
            <CheckBox
              name="newPool"
              placeholder="New Pool"
              choiceOne="Yes"
              choiceTwo="No"
              onPress={(value) => setNewPool(value)}
              selected={newPool}
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

            <FormPicker
              setError={(fieldError) => setError(fieldError)}
              name="projectType"
              icon="progress-question"
              placeholder="Project Type"
              title="Project type"
              data={projectTypeOptions}
              numOfColumns={3}
            />

            <FormPicker
              setError={(fieldError) => setError(fieldError)}
              name="poolLocation"
              icon="progress-question"
              placeholder="Pool Location"
              title="Pool Location"
              numOfColumns={3}
              data={poolLocationOptions}
            />

            <FormPicker
              setError={(fieldError) => setError(fieldError)}
              name="tileType"
              icon="progress-question"
              placeholder="Tile Type"
              title="Tile Type"
              numOfColumns={3}
              data={tileOptions}
            />
            <SubmitButton title={"Next"} iconName={"page-next"} width={250} />
          </View>
        </AppForm>
      </Wrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 250,
    width: 250,
  },
  text: {
    ...customProps.font,
    color: customProps.secondaryColor,
    fontSize: 60,
    fontWeight: "800",
  },
  description: {
    ...customProps.font,
    fontSize: 16,
    color: customProps.primaryColorDarkGray,
    textAlign: "center",
  },
});
