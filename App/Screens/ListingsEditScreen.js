import React, { useEffect, useState } from "react";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  AppPicker,
  CustomText,
  FormPicker,
  Icon,
  PrimaryButton,
  FormImagePicker,
  Screen,
  SubmitButton,
  UploadIndicator,
} from "../components/";

import customProps from "../config/customProps";
import customStyles from "../config/Styles/Styles";
import listingsApi from "../api/listings";
import { useLocation } from "../hooks";

const validationSchema = Yup.object().shape({
  description: Yup.string().label("Description"),
  title: Yup.string().required().min(15).label("Title"),
  images: Yup.array().min(1, "Please select at least on image"),
});

const questionTypePicker = [
  {
    label: "New Pool",
    value: 1,
    icon: "source-commit-start",
    backgroundColor: "red",
  },
  { label: "Domestic", value: 2, icon: "home", backgroundColor: "green" },
  { label: "Spa", value: 3, icon: "spa", backgroundColor: "blue" },
  {
    label: "Commercial",
    value: 4,
    icon: "currency-eur",
    backgroundColor: "red",
  },
  {
    label: "Commercial",
    value: 5,
    icon: "update",
    backgroundColor: "red",
  },
];

const poolTypePicker = [
  {
    label: "Skimmer",
    value: 1,
  },
  {
    label: "OverFlow",
    value: 1,
  },
  {
    label: "Well",
    value: 3,
  },
  {
    label: "Balance Tank",
    value: 4,
  },
];

const PoolLocationPicker = [
  {
    label: "in-Ground",
    value: 1,
  },
  {
    label: "RoofTop",
    value: 1,
  },
  {
    label: "AboveGround",
    value: 3,
  },
];

export default function ListingEditScreen() {
  // variables
  let today = new Date();
  let initialDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  // Hooks and  states
  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);
  const [location] = useLocation();

  /// picker states
  const [questionTypeSelection, setQuestionTypeSelection] = useState(
    questionTypePicker[0]
  );
  const [poolType, setPoolType] = useState(poolTypePicker[0]);
  const [poolLocation, setPoolLocation] = useState(PoolLocationPicker[0]);

  // Functions
  useEffect(() => {
    if (dataUploaded && animationFinish) {
      setAnimationFinish(false);
      setDataUploaded(false);
      setUploadVisible(false);
    }
  }, [dataUploaded, animationFinish]);

  const handleSubmit = async (values, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const response = await listingsApi.addListing(
      { ...values, location },
      (value) => setProgress(value)
    );
    setDataUploaded(true);

    if (!response.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing.");
    }

    resetForm();
  };
  return (
    <Screen style={styles.marginBottom}>
      <ScrollView>
        <UploadIndicator
          progress={progress}
          visible={uploadVisible}
          onFinish={() => {
            setAnimationFinish(true);
          }}
        />
        <View style={customStyles.textContainer}>
          <Image
            resizeMode="contain"
            style={customStyles.primaryImage}
            source={require("../assets/Images/MainLogo.png")}
          />
          <Text style={customStyles.secondaryTextHeroSection}>
            Quotation 📜{" "}
          </Text>
        </View>

        <AppForm
          initialValues={{
            email: "",
            ClientPhoneNumber: "",
            title: "",
            clientFirstName: "",
            clientLastName: "",
            clientAddressStreetOne: "",
            clientAddressStreetTwo: "",
            clientAddressLocality: "",
            questionTypePicker: null,
            poolType: null,
            poolLocation: null,
            description: "",
            poolLength: "",
            poolWidth: "",
            poolDepth: "",
            poolPerimeter: "",
            copingPerimeter: "",
            balanceLength: "",
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />

          <View style={customStyles.inputContinuer}>
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
              name="ClientPhoneNumber"
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
              textContentType="numeric"
              placeholder={initialDate}
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
              name="Street Address Line 2"
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
              selectedItem={questionTypeSelection}
              onItemSelect={(item) => setQuestionTypeSelection(item)}
              data={questionTypePicker}
              icon="progress-question"
              placeholder="type q question"
              title="Type a question"
              name="questionTypePicker"
            />
            <FormPicker
              selectedItem={questionTypeSelection}
              onItemSelect={(item) => setPoolType(item)}
              data={poolTypePicker}
              icon="progress-question"
              placeholder="Pool Type"
              title="Pool Type"
              name="poolType"
            />
            <FormPicker
              selectedItem={poolLocation}
              onItemSelect={(item) => setPoolType(item)}
              data={PoolLocationPicker}
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
              name="poolLength"
              textContentType="size"
              placeholder="ex: 23"
              title="pool Length"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              name="poolWidth"
              textContentType="size"
              placeholder="ex: 23"
              title="Pool Width"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              name="poolDepth"
              textContentType="size"
              placeholder="ex: 23"
              title="Pool Depth"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              name="poolPerimeter"
              textContentType="size"
              placeholder="ex: 23"
              title="Pool Perimeter"
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              name="copingPerimeter"
              textContentType="size"
              placeholder="ex: 23"
              title="Coping Perimeter"
            />
            <AppFormField
              autoCapitalize="sentences"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              name="balanceLength"
              textContentType="size"
              placeholder="ex: 23"
              title="Balance Tank Length"
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
          </View>

          <View>
            <SubmitButton title={"POST"} iconName={"post"} />
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    color: customProps.secondaryColor,
  },
  DateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: customProps.primaryColorLight,
    borderWidth: 1.5,
    padding: 5,
    borderRadius: 5,
    width: "100%",
  },
  dateText: {
    fontSize: customProps.innerTextFontSize,
    color: customProps.primaryColorLightGray,
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

//import DateTimePicker from "@react-native-community/datetimepicker";
//import CategoryPickerItem from "../components/Lists/CategoryPickerItem";

// };

//   <Form
//     initialValues={{
//       category: null,
//       description: "",
//       images: [],
//       price: "",
//       title: "",
//     }}
//     onSubmit={handleSubmit}
//     validationSchema={validationSchema}
//   >
//     <FormImagePicker name="images" />
//     <FormField
//       autoCapitalize="sentences"
//       autoCorrect
//       placeholder="Title"
//       name="title"
//       maxLength={255}
//     />
//     <FormField
//       placeholder="Price"
//       name="price"
//       keyboardType="numeric"
//       maxLength={8}
//       width={120}
//     />
//     <Picker
//       data={categories}
//       name="category"
//       numOfColumns={3}
//       placeholder="Category"
//       PickerItemComponent={CategoryPickerItem}
//       width="50%"
//     />
//   </Form>
