// ? * --> Third parties Libraries
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

// ? * --> App libraries
import { errorApi, listingsApi } from "../api";
import { useAuth } from "../hooks";
import Routes from "../Navigation/routes";
import listingData from "./Listing/Data/listingData";
import { customProps } from "../config";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ListItem,
  ItemsListPicker,
  MessagesContainer,
  DateTimePicker,
  ErrorMessage,
  FormPicker,
  Map,
  Icon,
  CheckBox,
  ScrollerView,
} from "../components";
import Functions from "./Listing/Functions/Functions";

export default function ListingDetails({ route }) {
  // ? * -->  variables

  const values = route.params;

  const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(1).label("Message"),
  });

  const validationSchemas = Yup.object().shape({
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

  // ? * -->  States

  ///*--> Application states
  const [error, setError] = useState(null);

  ///*--> Picker states
  const [projectType, setProjectType] = useState(
    projectTypeOptions[values.projectType_Id]
  );
  const [poolLocation, setPoolLocation] = useState(
    poolLocationOptions[values.poolLocation_Id]
  );
  const [poolTile, setPoolTile] = useState(tileOptions[values.projectType_Id]);
  const [locality, setLocality] = useState(
    localites.Malta[values.address.locality.id]
  );

  ///  *-->// Pool required options states
  const [poolType, setPoolType] = useState(values.poolType);
  const [poolSteps, setPoolSteps] = useState(values.poolSteps);
  const [quotationType, setQuotationType] = useState(values.quotationType);
  const [indoor, setIndoor] = useState(values.indoor);
  const [poolLeaking, setPoolLeaking] = useState(values.poolLeaking);
  const [isNewPool, setIsNewPool] = useState(values.isNewPool);

  ///  *-->// balance tank parameters states

  const [balanceTankVolume, setBalanceTankVolume] = useState(
    values.balanceTankVolume
  );

  ///*-->  Submit animation state
  const [progress, setProgress] = useState();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [animationFinish, setAnimationFinish] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);

  // ? * -->  hooks
  const { user } = useAuth();
  const navigation = useNavigation();
  // ? * --> refs

  // ? * --> States

  const [status, setStatus] = useState(values.status);
  const [edit, setEdit] = useState(false);

  // * --> // pool values state
  const [poolBalanceTankLength, setPoolBalanceTankLength] = useState(
    values.poolBalanceTankLength
  );
  const [poolCopingPerimeter, setPoolCopingPerimeter] = useState(
    values.poolCopingPerimeter
  );
  const [poolPerimeter, setPoolPerimeter] = useState(values.poolPerimeter);
  const [poolLength, setPoolLength] = useState(values.poolLength);
  const [poolWidth, setPoolWidth] = useState(values.poolWidth);
  const [poolDepthStart, setPoolDepthStart] = useState(values.poolDepthStart);
  const [poolDepthEnd, setPoolDepthEnd] = useState(values.poolDepthEnd);
  const [balanceTankWidth, setBalanceTankWidth] = useState(
    values.balanceTankWidth
  );
  const [balanceTankDepth, setBalanceTankDepth] = useState(
    values.balanceTankDepth
  );
  const [poolVolume, setPoolVolume] = useState(values.poolVolume);

  // ? * -->  Functions

  ///*--> Calculate Pool Volume
  const { calculatePoolVolume } = Functions;
  const setPoolStepsValue = (value) => {
    setPoolSteps(value);
  };
  const setPoolTileValue = (value) => {
    setPoolTile(value);
  };
  const setPoolIndoorValue = (value) => {
    setIndoor(value);
  };
  const setPoolLeakingValue = (value) => {
    setPoolLeaking(value);
  };

  // * -->// handle edit list
  const handleEdit = () => {
    {
      if (user.id !== values.user.id && !user.role.includes("Admin"))
        return Alert.alert(
          "modify Project",
          `this list can only be modified via admin rights or ${values.user.name}! `
        );
      if (values.isInArchive)
        return Alert.alert(
          "modify Project",
          `you can't modify a project while it is an the archive box!
        you must unarchive the project first `
        );
      if (values.isInRecycleBin)
        return Alert.alert(
          "modify Project",
          `you can't modify a project while it is an the Recycle Bin!
          you must restore the project first `
        );
      !edit
        ? Alert.alert(
            "modify Project",
            `Are you sure you want to modify ${values.site}? 
      \nany changes made will take place on the server only when *SAVE* button is pressed `,
            [
              {
                text: "Yes",
                onPress: () => {
                  setEdit(true);
                },
                style: "destructive",
              },
              {
                text: "No",
                onPress: () => {
                  setEdit(false);
                },
                style: "cancel",
              },
            ]
          )
        : Alert.alert(
            "dismiss changes",
            "any changes made will be lost and won't take any effect on the server unless save button is pressed",
            [
              {
                text: "Yes",
                onPress: () => {
                  setEdit(false);
                },
                style: "destructive",
              },
              {
                text: "No",
                style: "cancel",
              },
            ]
          );
    }
  };

  // * -->// handle unarchive list
  const unarchiveRequest = async () => {
    if (user.id !== values.user.id && !user.role.includes("Admin"))
      return Alert.alert(
        "modify Project",
        `this list can only be modified via admin rights or ${values.user.name}! `
      );
    try {
      const result = await listingsApi.unarchive(values.id);
      if (!result.ok) throw alert(result.data.message);
      navigation.navigate(
        route.name === "archivedListingDetails"
          ? Routes.ARCHIVED
          : Routes.LISTINGS
      );
    } catch (error) {
      errorApi.sendError({ catchError: error, user: "user" });
    }
  };

  // * -->// handle archive list
  const handleArchive = () => {
    if (user.id !== values.user.id && !user.role.includes("Admin"))
      return Alert.alert(
        "modify Project",
        `this list can only be modified via admin rights or ${values.user.name}! `
      );
    values.isInArchive
      ? Alert.alert(
          "Unarchive Project",
          `are you sure you want to unarchive ${values.site}?`,
          [{ text: "Yes", onPress: () => unarchiveRequest() }, { text: "No" }]
        )
      : Alert.alert(
          "Archive Project",
          `Are you sure you want to archive ${values.site}?`,
          [
            {
              text: "Yes",
              onPress: () => {
                listingsApi.archiveList(values.id);
                navigation.navigate(
                  route.name === "archivedListingDetails"
                    ? Routes.ARCHIVED
                    : Routes.LISTINGS
                );
              },
            },
            { text: "No" },
          ]
        );
  };

  // * -->// handle delete list
  const handleDelete = () => {
    if (user.id !== values.user.id && !user.role.includes("Admin"))
      return Alert.alert(
        "modify Project",
        `this list can only be modified via admin rights or ${values.user.name}! `
      );
    values.isInRecycleBin
      ? Alert.alert(
          "Restore Project",
          `Are you sure you want to restore ${values.site}?`,
          [
            {
              text: "Yes",
              onPress: () => {
                listingsApi.restoreList(values.id);
                navigation.navigate(
                  route.name === Routes.ARCHIVED_LISTING_DETAILS
                    ? Routes.ARCHIVED
                    : route.name === Routes.RECYCLE_BIN_LISTING_DETAILS
                    ? Routes.RECYCLE
                    : Routes.LISTINGS
                );
              },
            },
            { text: "No" },
          ]
        )
      : Alert.alert(
          "Delete Project",
          `Are you sure you want Delete ${values.site}?`,
          [
            {
              text: "Yes",
              onPress: () => {
                Alert.alert(
                  "Info",
                  `${values.site} has been moved to the recycle bin 
                and it will be permanently deleted after 30 days`
                );
                listingsApi.deleteList(values.id);
                navigation.navigate(
                  route.name === "archivedListingDetails"
                    ? Routes.ARCHIVED
                    : Routes.LISTINGS
                );
              },
            },
            { text: "No" },
          ]
        );
  };

  // * -->// handle status update list
  const handleStatus = () => {
    if (user.id !== values.user.id && !user.role.includes("Admin"))
      return Alert.alert(
        "modify Project",
        `this list can only be modified via admin rights or ${values.user.name}! `
      );
    if (values.isInArchive)
      return Alert.alert(
        "modify Project",
        `you can't modify a project while it is an the archive box!
        you must unarchive the project first `
      );
    if (values.isInRecycleBin)
      return Alert.alert(
        "modify Project",
        `you can't modify a project while it is an the Recycle Bin!
        you must restore the project first `
      );
    Alert.alert(
      "Change Project Status",
      `Are you sure you want to mark ${values.site} as ${
        status ? "not ready" : "ready"
      }?`,
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            setStatus(!status);
            listingsApi.updateListings(values.id, { status: !status });
          },
        },
        { text: "No" },
      ]
    );
  };

  //  ? * --> use Effects

  ///*--> Submit Effect
  useEffect(() => {
    if (dataUploaded && animationFinish) {
      setAnimationFinish(false);
      setDataUploaded(false);
      setUploadVisible(false);
    }
  }, [dataUploaded, animationFinish]);

  ///*--> Pool Volume
  useEffect(() => {
    if (!edit) return;
    if (poolType) {
      const { volume, totalVolume } = calculatePoolVolume(
        poolType,
        poolLength,
        poolWidth,
        poolDepthStart,
        poolDepthEnd
      );
      setPoolVolume(volume);
      //setTotalVolume(totalVolume);
    }
  }, [poolWidth, poolLength, poolDepthStart, poolDepthEnd, poolType]);

  ///* --> Balance Tank Volume
  useEffect(() => {
    if (!edit) return;
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
      //setTotalVolume(totalVolume);
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

  ///*--> Surface Area
  useEffect(() => {
    if (!edit) return;
    console.log("per");
  }, [poolCopingPerimeter, poolPerimeter]);

  return (
    <ScrollerView title={values.site} imageUri={values.images[0].url}>
      <View style={styles.detailsHeader}>
        <View style={styles.buttonsList}>
          <Icon
            name={"folder-multiple-image"}
            style={styles.buttons}
            innerSize={31}
            onPress={() =>
              navigation.navigate(Routes.VIEW_IMAGE, {
                images: values.images,
                viewImages: true,
              })
            }
            iconColor={customProps.primaryColorLight}
          />
          <Icon
            name={edit ? "backup-restore" : "file-document-edit-outline"}
            style={styles.buttons}
            innerSize={!edit ? 35 : 40}
            onPress={handleEdit}
            iconColor={
              edit ? customProps.importantIconColor : customProps.primaryColor
            }
          />
          <Icon
            name={values.status ? "check-circle" : "check-circle-outline"}
            style={styles.buttons}
            innerSize={35}
            onPress={handleStatus}
            iconColor={
              status ? customProps.primaryColor : customProps.importantIconColor
            }
          />
          <Icon
            name={values.isInArchive ? "archive-cancel" : "archive"}
            style={styles.buttons}
            innerSize={35}
            iconColor={
              values.isInArchive
                ? customProps.TertiaryColor
                : customProps.primaryColorDarkGray
            }
            onPress={handleArchive}
          />
          <Icon
            name={values.isInRecycleBin ? "delete-restore" : "delete"}
            style={styles.buttons}
            innerSize={35}
            onPress={handleDelete}
            iconColor={
              values.isInRecycleBin
                ? customProps.greenColor
                : customProps.primaryColorDark
            }
          />
        </View>
      </View>
      {/* project details area */}
      <View style={styles.detailsContainer}>
        <AppForm
          initialValues={{
            site: values.site,
            clientFirstName: values.clientFirstName,
            clientLastName: values.clientLastName,
            streetLineOne: values.address.streetLineOne,
            streetLineTwo: values.streetLineTwo,
            locality: locality,
            clientPhoneNumber: values.clientPhoneNumber,
            countryCode: values.countryCode,
            email: values.email,
            initialDate: values.initialDate,
            // pickers
            projectType: projectType,
            poolLocation: poolLocation,
            tileType: poolTile,
            // required options
            poolType: values.poolType,
            poolSteps: values.poolSteps,
            quotationType: values.quotationType,
            indoor: values.indoor,
            poolLeaking: values.poolLeaking,
            isNewPool: values.isNewPool,
            poolLength: values.poolLength,
            poolWidth: values.poolWidth,
            poolDepthEnd: values.poolDepthEnd,
            poolDepthStart: values.poolDepthStart,
            copingParameter: values.copingParameter,
            poolParameter: values.poolParameter,
            poolVolume: values.poolVolume,
            balanceTankLength: values.balanceLength,
            balanceTankWidth: values.balanceTankWidth,
            balanceTankDepth: values.balanceTankDepth,
            balanceTankVolume: values.balanceTankVolume,
            status: values.status,
            user: values.user,
            options: values.options,
            selectedPackage: values.selectedPackage,
            numberOfWallInlets: values.numberOfWallInlets,
            numberOfSkimmers: values.numberOfSkimmers,
            numberOfSumps: values.numberOfSumps,
            numberOfLights: values.numberOfLights,
            spaJets: values.spaJets,
            counterCurrent: values.counterCurrent,
            vacuumPoints: values.vacuumPoints,
            description: values.description,
            totalPrice: values.totalPrice,
            finalPrice: values.finalPrice,
          }}
          //onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.detailsContainer}>
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
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
            />
            <AppFormField
              name="clientFirstName"
              placeholder="First Name"
              title={"First Name"}
              icon={"account-box"}
              autoCapitalize="words"
              textContentType="name"
              autoCorrect={false}
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
            />
            <AppFormField
              name="clientLastName"
              placeholder="Last Name"
              title={"Last Name"}
              icon={"account-box"}
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
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
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
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
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
            />
            <AppFormField
              name="streetLineOne"
              icon="map"
              placeholder="Street Address"
              title="Street Address "
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="streetAddressLine1"
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
            />
            {values.address.streetLineTwo ||
              (edit && (
                <AppFormField
                  name="streetLineTwo"
                  icon="map"
                  title="Street address Line 2"
                  placeholder="optional"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="streetAddressLine2"
                  clearButtonMode={edit ? "always" : "never"}
                  editable={edit}
                />
              ))}
            <FormPicker
              name="locality"
              placeholder="Locality"
              title="Locality"
              icon="city"
              data={localites.Malta}
              selectedItem={locality}
              onItemSelect={(item) => setLocality(item)}
              numOfColumns={3}
              disabled={!edit}
            />
            <DateTimePicker name="initialDate" enabled={!edit} />
            {/*
           // ? * --> pool required options
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
              disabled={!edit}
            />
            <CheckBox
              name="quotationType"
              placeholder="Quotation Type"
              choiceOne="Domestic"
              choiceTwo="Commercial"
              width={160}
              onPress={(value) => setQuotationType(value)}
              selected={quotationType}
              disabled={!edit}
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
              disabled={!edit}
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
              disabled={!edit}
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
              disabled={!edit}
            />
            <CheckBox
              name="indoor"
              placeholder="indoor"
              choiceOne="Yes"
              choiceTwo="No"
              onPress={(value) => setIndoor(value)}
              selected={indoor}
              clearButtonMode={edit ? "always" : "never"}
              disabled={!edit}
            />
            <CheckBox
              name="poolSteps"
              placeholder="Pool Steps"
              choiceOne="Yes"
              choiceTwo="No"
              onPress={(value) => setPoolSteps(value)}
              selected={poolSteps}
              clearButtonMode={edit ? "always" : "never"}
              disabled={!edit}
            />
            <CheckBox
              name="poolType"
              placeholder="Pool Type"
              choiceOne="Skimmer"
              choiceTwo="OverFlow"
              width={160}
              onPress={(value) => setPoolType(value)}
              selected={poolType}
              clearButtonMode={edit ? "always" : "never"}
              disabled={!edit}
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
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
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
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
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
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
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
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
            />
            <AppFormField
              //  Todo: set pool volume
              // ? * -->  name="poolVolume"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              value={poolVolume.toString()}
              title="Pool Volume"
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
            />
            <AppFormField
              name="copingParameter"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              getValue={(value) => setPoolCopingPerimeter(value)}
              placeholder="ex: 23"
              title="Coping Parameter"
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
            />
            <AppFormField
              name="poolParameter"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              getValue={(value) => setPoolPerimeter(value)}
              placeholder="ex: 23"
              title="Pool Parameter"
              clearButtonMode={edit ? "always" : "never"}
              editable={edit}
            />
            {/*
            // ? * --> Balance Tank Parameters
            if poolType === "Overflow"?    
          */}
            {(!poolType && edit) ||
              (!values.poolType && (
                <View style={{ width: "100%" }}>
                  <CheckBox
                    name="poolLeaking"
                    placeholder="Pool Leaking"
                    choiceOne="Yes"
                    choiceTwo="No"
                    onPress={setPoolLeaking}
                    selected={poolLeaking}
                    disabled={!edit}
                  />
                  <AppFormField
                    name="balanceTankLength"
                    autoCapitalize="none"
                    keyboardType="decimal-pad"
                    icon="move-resize-variant"
                    placeholder="ex: 23"
                    title="Balance Tank Length"
                    getValue={(value) => setPoolBalanceTankLength(value)}
                    clearButtonMode={edit ? "always" : "never"}
                    editable={edit}
                  />
                  <AppFormField
                    name="balanceTankWidth"
                    autoCapitalize="none"
                    keyboardType="decimal-pad"
                    icon="move-resize-variant"
                    placeholder="ex: 23"
                    title="Balance Tank Width"
                    editable={edit}
                    getValue={(value) => setBalanceTankWidth(value)}
                  />
                  <AppFormField
                    name="balanceTankDepth"
                    autoCapitalize="none"
                    keyboardType="decimal-pad"
                    icon="move-resize-variant"
                    placeholder="ex: 23"
                    title="Balance Tank Depth"
                    editable={edit}
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
                    editable={edit}

                    //getValue={(value) => setBalanceTankVolume(value)}
                  />
                </View>
              ))}
            <AppFormField
              name="numberOfWallInlets"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              placeholder="Optional Number"
              title="No. of Wall inlets"
              editable={edit}
            />
            <AppFormField
              name="numberOfSumps"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              placeholder="Optional Number"
              title="No. of Sumps"
              editable={edit}
            />
            <AppFormField
              name="numberOfSkimmers"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              placeholder="Optional Number"
              title="No. of skimmers"
              editable={edit}
            />
            <AppFormField
              name="numberOfLights"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              placeholder="Optional Number"
              title="No. of Lights"
              editable={edit}
            />
            <AppFormField
              name="spaJets"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              placeholder="Optional Number"
              title="No. of Spa Jets"
              editable={edit}
            />
            <AppFormField
              name="counterCurrent"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              placeholder="Optional Number"
              title="Counter Current"
              editable={edit}
            />
            <AppFormField
              name="vacuumPoints"
              autoCapitalize="none"
              keyboardType="decimal-pad"
              icon="move-resize-variant"
              placeholder="Optional Number"
              title="Vacuum points"
              editable={edit}
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
              editable={edit}
            />
            <ErrorMessage visible={error} error={error} />
          </View>
          <SubmitButton
            title={"Save"}
            iconName={"content-save-all"}
            width={250}
            visible={edit}
          />
        </AppForm>
      </View>

      {/* Map area */}
      <Map title={values.site} projectPin={values.address.location} />
      {/*  */}
      <ListItem
        title={values.user.name}
        subTitle={values.user.role}
        imagePath={values.user.image}
        clearButtonMode={edit ? "always" : "never"}
        disabled={true}
        style={{ container: { width: "90%", backgroundColor: "transparent" } }}
      />
      <MessagesContainer user={user} />
    </ScrollerView>
  );
}

const styles = StyleSheet.create({
  buttonsList: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  buttons: {
    backgroundColor: "transparent",
  },
  detailsHeader: {
    padding: 10,
    backgroundColor: customProps.secondaryColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    transform: [{ translateY: -10 }],
  },
  list: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
    maxHeight: 310,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 15,
  },
  form: {
    padding: 10,
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  price: {
    color: customProps.secondaryColor,
    fontSize: 18,
  },
});
