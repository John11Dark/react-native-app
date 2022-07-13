// Third parties libraries
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Callout, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Yup from "yup";
import * as Location from "expo-location";

// Project components  and configurations
import {
  AppForm,
  AppFormField,
  FormPicker,
  FormImagePicker,
  Screen,
  SubmitButton,
  UploadIndicator,
  Icon,
  ItemsListPicker,
  ErrorMessage,
} from "../components/";

import { settings, Styles } from "../config";
import listingsApi from "../api/listings";
import { useAuth, useLocation } from "../hooks";
import addOnsData from "../assets/Data/items";
// Variables
const validationSchema = Yup.object().shape({
  description: Yup.string().label("Description"),
  title: Yup.string().required().min(15).label("Title"),
  images: Yup.array()
    .min(1, "Please select at least on image")
    .max(3, "The maximum is three images"),
});

const questionTypePicker = [
  {
    label: "New Pool",
    value: 1,
    icon: "pool",
    backgroundColor: "#BEB3AD",
  },
  { label: "Domestic", value: 2, icon: "home", backgroundColor: "#3f5a6f" },
  { label: "Spa", value: 3, icon: "spa", backgroundColor: "#55bbda" },
  {
    label: "Commercial",
    value: 4,
    icon: "currency-eur",
    backgroundColor: "#ea552b",
  },
  {
    label: "Commercial",
    value: 5,
    icon: "update",
    backgroundColor: "#B5C273",
  },
  {
    label: "Other",
    name: "Other",
    value: 4,
    icon: "progress-question",
    backgroundColor: "#613224",
  },
];

const poolTypePicker = [
  {
    label: "Skimmer",
    value: 1,
    icon: "align-vertical-bottom",
    backgroundColor: "#55bbda",
  },
  {
    label: "OverFlow",
    value: 2,
    icon: "overscan",
    backgroundColor: "#ea552b",
  },
  {
    label: "Well",
    value: 3,
    icon: "update",
    backgroundColor: "#B5C273",
  },
  {
    label: "Balance Tank",
    value: 4,
    icon: "scale-balance",
    backgroundColor: "#BEB3AD",
  },
  {
    label: "Other",
    name: "Other",
    value: 4,
    icon: "progress-question",
    backgroundColor: "#613224",
  },
];

const PoolLocationPicker = [
  {
    label: "in-Ground",
    value: 1,
    icon: "floor-plan",
    backgroundColor: "#55bbda",
  },
  {
    label: "RoofTop",
    value: 2,
    icon: "home-roof",
    backgroundColor: "#ea552b",
  },
  {
    label: "AboveGround",
    value: 3,
    icon: "grass",
    backgroundColor: "#B5C273",
  },
  {
    label: "Other",
    name: "Other",
    value: 4,
    icon: "progress-question",
    backgroundColor: "#613224",
  },
];
// get the current date
let today = new Date();
let currentDate = `${today.getFullYear()}/${
  today.getMonth() +
  1 /*get month works with zero index thats why i added one on month */
}/${today.getDate()}`;
let currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

export default function ListingEditScreen() {
  // Hooks and  states

  // App States
  const [progress, setProgress] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);
  const { user } = useAuth();

  // location state
  const [location] = useLocation();
  const [pin, setPin] = useState({
    latitude: 35.89099722016769,
    longitude: 14.461754106055244,
  });

  /// options
  const [numberOfWallInlets, setNumberOfWallInlets] = useState("");
  const [numberOfSumps, setNumberOfSumps] = useState("");
  const [numberOfSkimmers, setNumberOfSkimmers] = useState("");
  const [numberOfLights, setNumberOfLights] = useState("");
  const [spaJets, setSpaJets] = useState("");
  const [counterCurrent, setCounterCurrent] = useState("");
  const [vacuumPoints, setVacuumPoints] = useState("");

  // pool values state
  const [poolBalanceTankLength, setPoolBalanceTankLength] = useState("");
  const [poolCopingPerimeter, setPoolCopingPerimeter] = useState("");
  const [poolPerimeter, setPoolPerimeter] = useState("");
  const [poolLength, setPoolLength] = useState("");
  const [poolWidth, setPoolWidth] = useState("");
  const [poolDepthStart, setPoolDepthStart] = useState("");
  const [poolDepthEnd, setPoolDepthEnd] = useState("");
  const [balanceTankWidth, setBalanceTankWidth] = useState("");
  const [balanceTankDepth, setBalanceTankDepth] = useState("");
  const [balanceTankPipe, setBalanceTankPipe] = useState("");
  const [poolVolume, setPoolVolume] = useState(0);
  const poolValues = {
    poolLength: poolLength,
    poolWidth: poolWidth,
    poolDepthEnd: poolDepthEnd,
    poolDepthStart: poolDepthStart,
    poolPerimeter: poolPerimeter,
    copingPerimeter: poolCopingPerimeter,
    balanceLength: poolBalanceTankLength,
    poolVolume: poolVolume,
    balanceTankWidth: balanceTankWidth,
    balanceTankDepth: balanceTankDepth,
    balanceTankPipe: balanceTankPipe,
    poolVolume: poolVolume,
  };
  /// picker states
  const [questionTypeSelection, setQuestionTypeSelection] = useState(
    questionTypePicker[0]
  );
  const [poolType, setPoolType] = useState(poolTypePicker[0]);
  const [poolLocation, setPoolLocation] = useState(PoolLocationPicker[0]);
  const [ItemsAddOnsListValue, setItemsAddOnsListValue] = useState(addOnsData);
  const [ItemsAddOnsSelectedValue, setItemsAddOnsSelectedValue] = useState([]);
  const [error, serError] = useState("null");

  const setTitle = "first location";

  // Functions

  // Calculate Pool Volume Function
  const parseInput = (number) => {
    number = parseFloat(number);
    if (isNaN(number)) number = 0;
    return number;
  };
  const calculatePoolVolume = (
    width = 0,
    Length = 0,
    DepthStart = 0,
    balanceTank,
    PoolType = 1
  ) => {
    Length = parseInput(DepthStart);
    width = parseInput(DepthStart);
    DepthStart = parseInput(DepthStart);

    let Volume = Length * width * DepthStart;
    if (poolType === 2 || poolType === "OVERFLOW") {
      balanceTank = parseInput(balanceTank);
      if (!balanceTank === 0) {
        balanceTank = Volume * 0.2;
      }
      Volume = Volume + balanceTank;
    } else if (poolType === 3 || poolType === "SKIMMER.Other") {
      Walls = (Length + width) * 2 * 1.3 * 1.1;
      Floor = Length * width;
      totalSize = Walls + Floor;
      priceOF = 25.8;
      totalPrice = totalSize * priceOF;
      extraPrice = 350.0;
      finalPrice = totalPrice + extraPrice;
    } else if (poolType === 4 || poolType === "OVERFLOW.Other") {
      Walls = (Length + width) * 2 * 1.3 * 1.1;
      Floor = Length * width;
      totalSize = Walls + Floor;
      priceOF = 25.8;
      totalPrice = totalSize * priceOF;
      extraPrice = 350.0;
      extraSize = 2;
      pipeSize = width + Length + extraSize;
      pipePrice = 40;
      finalPrice = pipeSize + pipePrice + totalPrice + extraPrice;
    }
    return Volume;
  };

  // set location function
  const setLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setPin({ latitude, longitude });
    } catch (error) {
      console.error(error);
    }
  };

  // options list functions

  const onItemAddOnsRemove = (item) => {
    Alert.alert("Remove Item", "Are you sure you want to Remove this Item?", [
      {
        text: "Yes",
        onPress: () => {
          setItemsAddOnsSelectedValue(
            ItemsAddOnsSelectedValue.filter(
              (category) => category.value !== item.value
            )
          ),
            setItemsAddOnsListValue([...ItemsAddOnsListValue, item]);
          setItemsAddOnsListValue(
            ItemsAddOnsListValue.sort(
              (elementA, elementB) => elementA.value - elementB.value
            )
          );
        },
        style: "destructive",
      },
      { text: "No", style: "cancel" },
    ]);
  };

  const onItemAddOnsAdded = (item) => {
    setItemsAddOnsSelectedValue([...ItemsAddOnsSelectedValue, item]);
    setItemsAddOnsListValue(
      ItemsAddOnsListValue.filter((category) => category.value !== item.value)
    );
  };

  // submit function
  const handleSubmit = async (values, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const data = {
      ...values,
      location,
      ...poolValues,
      poolVolume: poolVolume,
      user: user,
    };
    const response = await listingsApi.addListing(data, (value) =>
      setProgress(value)
    );
    setDataUploaded(true);

    if (!response.ok) {
      setUploadVisible(false);
      console.log(response);
      serError(response.originalError);
      return alert(
        `Could not save ${values.title}.\nPlease try again an check that you have inserted all values correctly`
      );
    }

    //resetForm();
  };
  // use Effects

  // Submit Effect
  useEffect(() => {
    if (dataUploaded && animationFinish) {
      setAnimationFinish(false);
      setDataUploaded(false);
      setUploadVisible(false);
    }
  }, [dataUploaded, animationFinish]);

  // Location Effect
  useEffect(() => {
    if (location) {
      setPin(location);
    }
  }, [location]);
  useEffect(() => {
    setPoolVolume(calculatePoolVolume(poolLength, poolWidth, poolDepthStart));
  }, [
    poolWidth,
    poolDepthStart,
    poolLength,
    poolDepthEnd,
    poolPerimeter,
    poolCopingPerimeter,
    poolBalanceTankLength,
    balanceTankWidth,
    balanceTankDepth,
    balanceTankPipe,
  ]);

  return (
    <Screen style={styles.marginBottom}>
      <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={"padding"}>
        <ScrollView>
          {/* upload animation */}
          <UploadIndicator
            progress={progress}
            visible={uploadVisible}
            onFinish={() => {
              setAnimationFinish(true);
            }}
          />
          {/* Input form */}
          <AppForm
            initialValues={{
              email: "john@mail.com",
              countryCode: "+356",
              clientPhoneNumber: "79230096",
              title: "This is the second pool",
              clientFirstName: "John",
              clientLastName: "Muller",
              clientAddressStreetOne: "Triq, 68",
              clientAddressStreetTwo: "Had-Dingle Street",
              clientAddressLocality: "ir-Rabat",
              description: "some text",
              initialDate: currentDate,
              status: false,
              images: [],
              // option pickers
              questionTypePicker: null,
              poolType: null,
              poolLocation: null,
              optionalPackages: [],
              // number of options
              numberOfWallInlets: "1",
              numberOfSkimmers: "1",
              numberOfSumps: "1",
              numberOfLights: "1",
              spaJets: "1",
              counterCurrent: "1",
              vacuumPoints: "1",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormImagePicker maxLength={3} name="images" />
            <Text style={Styles.secondaryTextHeroSection}>Quotation 📜 </Text>

            <View style={Styles.inputContinuer}>
              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                name="title"
                placeholder="Title"
                width={"100%"}
                title={"Title"}
                icon={"format-title"}
              />
              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                name="clientFirstName"
                placeholder="First Name"
                width={"100%"}
                title={"First Name"}
                textContentType="name"
                icon={"account-box"}
              />
              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                name="clientLastName"
                placeholder="Last Name"
                width={"100%"}
                textContentType="name"
                title={"Last Name"}
                icon={"account-box"}
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                textContentType="emailAddress"
                placeholder="Email"
                title="Email Address"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="cellphone"
                name="clientPhoneNumber"
                keyboardType="numeric"
                textContentType="telephoneNumber"
                placeholder="35679230096"
                title="Phone Number"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="calendar"
                name="initialDate"
                keyboardType="numeric"
                placeholder={currentDate}
                title="Initial Date"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="map"
                name="clientAddressStreetOne"
                textContentType="streetAddressLine1"
                placeholder="Street Address"
                title="Street Address "
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="map"
                name="clientAddressStreetTwo"
                textContentType="streetAddressLine2"
                placeholder="Street address Line 2"
                title="Street address Line 2"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="map"
                name="clientAddressLocality"
                textContentType="addressCity"
                placeholder="Locality"
                title="Locality"
              />
              <FormPicker
                data={questionTypePicker}
                selectedItem={questionTypeSelection}
                onItemSelect={(item) => setQuestionTypeSelection(item)}
                numOfColumns={3}
                icon="progress-question"
                placeholder="type q question"
                title="Type a question"
                name="questionTypePicker"
              />
              <FormPicker
                selectedItem={poolType}
                onItemSelect={(item) => setPoolType(item)}
                data={poolTypePicker}
                numOfColumns={3}
                icon="progress-question"
                placeholder="Pool Type"
                title="Pool Type"
                name="poolType"
              />
              <FormPicker
                selectedItem={poolLocation}
                onItemSelect={(item) => setPoolLocation(item)}
                data={PoolLocationPicker}
                numOfColumns={3}
                icon="crosshairs-question"
                placeholder="Pool Location"
                title="Pool Location"
                name="poolLocation"
              />

              {/* pool calculation input  */}
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                onChangeText={(lengthValue) => setPoolLength(lengthValue)}
                placeholder="ex: 23"
                title="pool Length"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                onChangeText={(widthValue) => setPoolWidth(widthValue)}
                placeholder="ex: 23"
                title="Pool Width"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                onChangeText={(DepthStartValue) =>
                  setPoolDepthStart(DepthStartValue)
                }
                placeholder="ex: 23"
                title="Pool Depth Start"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                onChangeText={(depthEndValue) => setPoolDepthEnd(depthEndValue)}
                placeholder="ex: 23"
                title="Pool Depth End"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                onChangeText={(poolPerimeterValue) =>
                  setPoolPerimeter(poolPerimeterValue)
                }
                placeholder="ex: 23"
                title="Pool Perimeter"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                title="Coping Perimeter"
                onChangeText={(poolCopingPerimeterValue) =>
                  setPoolCopingPerimeter(poolCopingPerimeterValue)
                }
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                title="Balance Tank Length"
                onChangeText={(poolBalanceTank) =>
                  setPoolBalanceTankLength(poolBalanceTank)
                }
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                onChangeText={(balanceTankWidthValue) =>
                  setBalanceTankWidth(balanceTankWidthValue)
                }
                title="Balance Tank Width"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                onChangeText={(BalanceTankDepthValue) =>
                  setBalanceTankDepth(BalanceTankDepthValue)
                }
                title="Balance Tank Depth"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                onChangeText={(BalanceTankPipeValue) =>
                  setBalanceTankPipe(BalanceTankPipeValue)
                }
                title="Balance Tank Pipe"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="numberOfWallInlets"
                title="No. of Wall inlets"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="numberOfSumps"
                title="No. of Sumps"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="numberOfSkimmers"
                title="No. of skimmers"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="numberOfLights"
                title="No. of Lights"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="spaJets"
                title="No. of Spa Jets"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="counterCurrent"
                title="Counter Current"
              />
              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="vacuumPoints"
                title="Vacuum points"
              />

              <AppFormField
                autoCapitalize="none"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                onChangeText={(volumeValue) => {
                  setPoolVolume(volumeValue);
                }}
                defaultValue={poolVolume.toString()}
                title="Pool Volume"
              />

              <AppFormField
                autoCapitalize="sentences"
                autoCorrect
                name="description"
                placeholder="Type a description or extra remarks"
                title="Description"
                numberOfLines={5}
                multiline
              />

              <ItemsListPicker
                name="optionalPackages"
                data={ItemsAddOnsListValue}
                onItemRemove={onItemAddOnsRemove}
                onItemAdd={onItemAddOnsAdded}
                Items={ItemsAddOnsSelectedValue}
              />
              <ErrorMessage visible={error} error={error} />
              <SubmitButton title={"POST"} iconName={"post"} />
            </View>
          </AppForm>
          {/* Map view */}
          <View style={styles.mapViewBox}>
            <ScrollView
              horizontal
              style={{
                flex: 0,
                position: "absolute",
                top: 20,
                width: "95%",
                zIndex: 1,
                backgroundColor: Styles.colors.darkCardBackgroundColor,
                borderRadius: 10,
              }}
            >
              <GooglePlacesAutocomplete
                placeholder="search"
                GooglePlacesSearchQuery={{
                  rankby: "distance",
                }}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log("first");
                  setPin({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                  });
                }}
                query={{
                  key: settings.googleApiKey,
                  language: "en",
                  components: "country:mt",
                  radius: "30000",
                  location: pin,
                }}
                bounce={300}
                maxLength={3}
                styles={{
                  container: {
                    width: "100%",
                    borderRadius: 10,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                  },
                  textInput: {
                    backgroundColor: Styles.colors.darkCardBackgroundColor,
                    color: Styles.colors.primaryColorLight,
                    ...Styles.colors.font,
                    width: "100%",
                    height: "100%",
                    minWidth: 365,
                    fontSize: 18,
                  },
                }}
              />
            </ScrollView>

            <Icon
              name="map-marker-alert"
              backgroundColor={Styles.colors.secondaryColor}
              style={styles.mapMarker}
              innerSize={30}
              size={40}
              onPress={setLocation}
            />

            <MapView
              initialRegion={{
                latitude: 35.878173828125,
                longitude: 14.396160663677879,
                latitudeDelta: 0.3111922,
                longitudeDelta: 0.45111421,
              }}
              style={styles.map}
            >
              {true && (
                <Marker
                  coordinate={pin}
                  pinColor={Styles.colors.secondaryColor}
                  draggable={true}
                  onDragEnd={(event) => {
                    setPin({
                      latitude: event.nativeEvent.coordinate.latitude,
                      longitude: event.nativeEvent.coordinate.longitude,
                    });
                  }}
                >
                  <Callout>
                    <Text>{setTitle}</Text>
                  </Callout>
                </Marker>
              )}
            </MapView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mapMarker: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 5,
  },
  mapsSearchBar: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    width: "90%",
    height: 50,
    borderRadius: 15,
    zIndex: 2,
    padding: 0,
    justifyContent: "center",
  },
  mapViewBox: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    height: 350,
    borderRadius: 20,
    overflow: "hidden",
    margin: 10,
    marginBottom: 30,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  primaryContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  marginBottom: {
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  primaryText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "900",
    padding: 5,
    color: Styles.colors.secondaryColor,
  },
  DateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Styles.colors.primaryColorLight,
    borderWidth: 1.5,
    padding: 5,
    borderRadius: 5,
    width: "100%",
  },
  dateText: {
    fontSize: Styles.colors.innerTextFontSize,
    color: Styles.colors.primaryColorLightGray,
    textAlign: "left",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
