// third parties Libraries
import React, { useEffect, useState, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  Animated,
  TouchableOpacity,
} from "react-native";

import MapView, { Callout, Marker } from "react-native-maps";
import * as Yup from "yup";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  TriggeringView,
  ImageHeaderScrollView,
} from "react-native-image-header-scroll-view";
//  App libraries
import { errorApi, listingsApi, commentsApi } from "../api";
import { useAuth, useNotifications, useApi } from "../hooks";
import addOnsData from "../assets/Data/items";
import Routes from "../Navigation/routes";
import { customProps } from "../config";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ListItem,
  MessageView,
  DataLoadingError,
  FormPicker,
  ItemsListPicker,
  Icon,
  CheckBox,
} from "../components";

export default function ListingDetails({ route }) {
  // variables
  const values = route.params;
  const maximumHight = 320;
  const headerHeight = 100;
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, maximumHight, headerHeight);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 190],
    outputRange: [0, 280],
  });

  const validationSchema = Yup.object().shape({
    message: Yup.string().required().min(1).label("Message"),
  });

  const projectTypePicker = [
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

  // states and hooks
  const { user } = useAuth();
  const { scheduleLocalNotification } = useNotifications();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const scrollViewRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [discussionData, setDiscussionData] = useState([]);
  const { data, loading, error, request } = useApi(commentsApi.getComments);

  // pool values state
  const [status, setStatus] = useState(values.status);
  const [edit, setEdit] = useState(false);
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
  };

  // options
  const [numberOfWallInlets, setNumberOfWallInlets] = useState("");
  const [numberOfSkimmers, setNumberOfSkimmers] = useState("");
  const [numberOfLights, setNumberOfLights] = useState("");
  const [spaJets, setSpaJets] = useState("");
  const [counterCurrent, setCounterCurrent] = useState("");
  const [vacuumPoints, setVacuumPoints] = useState("");

  /// picker states
  const [projectType, setProjectType] = useState(projectTypePicker[0]);
  const [poolType, setPoolType] = useState(poolTypePicker[0]);
  const [poolLocation, setPoolLocation] = useState(PoolLocationPicker[0]);
  const [ItemsAddOnsListValue, setItemsAddOnsListValue] = useState(addOnsData);
  const [ItemsAddOnsSelectedValue, setItemsAddOnsSelectedValue] = useState([]);

  // functions

  //_* header text animation value
  const setValue = (value) => {
    scrollY.setValue(value);
    if (value <= 170) {
      setVisible(false);
    } else if (value >= 190) {
      setVisible(true);
    }
  };

  //_* options list functions

  //___* On Remove
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
      },
      { text: "No" },
    ]);
  };

  //___* On Add
  const onItemAddOnsAdded = (item) => {
    setItemsAddOnsSelectedValue([...ItemsAddOnsSelectedValue, item]);
    setItemsAddOnsListValue(
      ItemsAddOnsListValue.filter((category) => category.value !== item.value)
    );
  };

  // handle edit list
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
            `Are you sure you want to modify ${values.title}? 
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

  // handle unarchive list
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

  // handle archive list
  const handleArchive = () => {
    if (user.id !== values.user.id && !user.role.includes("Admin"))
      return Alert.alert(
        "modify Project",
        `this list can only be modified via admin rights or ${values.user.name}! `
      );
    values.isInArchive
      ? Alert.alert(
          "Unarchive Project",
          `are you sure you want to unarchive ${values.title}?`,
          [{ text: "Yes", onPress: () => unarchiveRequest() }, { text: "No" }]
        )
      : Alert.alert(
          "Archive Project",
          `Are you sure you want to archive ${values.title}?`,
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

  // handle delete list
  const handleDelete = () => {
    if (user.id !== values.user.id && !user.role.includes("Admin"))
      return Alert.alert(
        "modify Project",
        `this list can only be modified via admin rights or ${values.user.name}! `
      );
    values.isInRecycleBin
      ? Alert.alert(
          "Restore Project",
          `Are you sure you want to restore ${values.title}?`,
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
          `Are you sure you want Delete ${values.title}?`,
          [
            {
              text: "Yes",
              onPress: () => {
                Alert.alert(
                  "Info",
                  `${values.title} has been moved to the recycle bin 
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

  const [poolSteps, setPoolSteps] = useState(false);
  const [poolTile, setPoolTile] = useState(true);
  const [indoor, setIndoor] = useState(false);
  const [poolLeaking, setPoolLeaking] = useState(false);
  // Functions
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

  // handle status update list
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
      `Are you sure you want to mark ${values.title} as ${
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

  // handle update submit list
  const handleCommentSubmit = async ({ message }, { resetForm }) => {
    if (values.isInRecycleBin || values.isInArchive) {
      return Alert.alert(
        "Comment",
        `you can't post a comment  while the project is in ${
          values.isInRecycleBin ? "the recycle bin!" : "the archive box"
        }
      you must restore the project first `
      );
    }
    try {
      Keyboard.dismiss();

      const comment = {
        comment: message,
        listingId: values.id,
        id: discussionData.length + 1 + message,
        dateTime: new Date().toDateString(),
        user: {
          name: user.name,
          id: user.id,
          image: user.images,
        },
      };

      const result = await commentsApi.postComment(comment);
      if (!result.ok) {
        errorApi.sendError({
          name: "postComment",
          originalError: result.originalError,
          errorMessage: result.message ? result.message : undefined,
          result: result,
          user: user,
        });
        throw result.originalError;
      }

      scheduleLocalNotification("Info", "Your comment has been posted!", {
        navigate: "ListingDetails",
      });
      resetForm();
      discussionData.push(comment);
    } catch (error) {
      errorApi.sendError({
        user: user,
        name: "try catch useNotifications 'comment'",
        errorMessage: error,
      });
    }
  };

  // Effects
  useEffect(() => {
    request(values.id);
    setDiscussionData(data);
  }, [isFocused, route.params, discussionData]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: customProps.primaryColorDark }}
      behavior="padding"
      keyboardVerticalOffset={30}
    >
      <ImageHeaderScrollView
        onScroll={(e) => setValue(e.nativeEvent.contentOffset.y)}
        minHeight={headerHeight}
        maxHeight={maximumHight}
        maxOverlayOpacity={0.5}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image
            blurRadius={visible ? 20 : 5}
            style={styles.image}
            source={{ uri: values.images[0].url }}
          />
        )}
        renderForeground={() => (
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}> {values.title}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.navTitle,
              {
                transform: [{ translateY: translateY }],
                display: visible ? "flex" : "none",
              },
            ]}
          >
            {values.title}
          </Animated.Text>
        )}
      >
        <TriggeringView
          style={{ backgroundColor: customProps.primaryColorDark }}
        >
          <View style={styles.detailsHeader}>
            <View style={styles.buttonsList}>
              <Icon
                name={"folder-multiple-image"}
                style={styles.buttons}
                innerSize={31}
                onPress={() =>
                  navigation.navigate(Routes.VIEW_IMAGE, values.images)
                }
                iconColor={customProps.primaryColorLight}
              />
              <Icon
                name={edit ? "backup-restore" : "file-document-edit-outline"}
                style={styles.buttons}
                innerSize={!edit ? 35 : 40}
                onPress={handleEdit}
                iconColor={
                  edit
                    ? customProps.importantIconColor
                    : customProps.primaryColor
                }
              />
              <Icon
                name={values.status ? "check-circle" : "check-circle-outline"}
                style={styles.buttons}
                innerSize={35}
                onPress={handleStatus}
                iconColor={
                  status
                    ? customProps.primaryColor
                    : customProps.importantIconColor
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
                email: values.email,
                clientPhoneNumber: values.clientPhoneNumber,
                clientFirstName: values.clientFirstName,
                clientLastName: values.clientLastName,
                clientAddressStreetOne: values.clientAddressStreetOne,
                clientAddressStreetTwo: values.clientAddressStreetTwo,
                clientAddressLocality: values.clientAddressLocality,
                status: false,
                indoor: values.indoor,
                mosaicOrTile: values.mosaicOrTile,
                poolSteps: values.poolSteps,
                poolLeaking: values.poolLeaking,
                // option pickers
                projectType: values.projectType,
                poolType: values.poolType,
                poolLocation: values.poolLocation,
                optionalPackages: [],
                // number of options
                numberOfWallInlets: values.numberOfWallInlets.toString(),
                numberOfSkimmers: values.numberOfSkimmers.toString(),
                numberOfSumps: values.numberOfSumps.toString(),
                numberOfLights: values.numberOfLights.toString(),
                spaJets: values.spaJets.toString(),
                counterCurrent: values.counterCurrent.toString(),
                vacuumPoints: values.vacuumPoints.toString(),
              }}
              //onSubmit={handleSubmit}
              //validationSchema={validationSchema}
            >
              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                textContentType="name"
                name="clientFirstName"
                title={"Client First Name"}
                editable={edit}
                defaultValue={values.clientFirstName}
                clearButtonMode="while-editing"
                style={{ padding: 5 }}
                icon="email"
              />

              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                textContentType="name"
                name="clientLastName"
                title="Client Last Name"
                editable={edit}
                defaultValue={values.clientLastName}
                clearButtonMode="while-editing"
                style={{ padding: 5 }}
                icon="email"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                textContentType="emailAddress"
                title="Email Address"
                editable={edit}
                defaultValue={values.email}
                clearButtonMode="while-editing"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="cellphone"
                name="clientPhoneNumber"
                keyboardType="numeric"
                textContentType="telephoneNumber"
                title="Phone Number"
                editable={edit}
                defaultValue={values.clientPhoneNumber}
                clearButtonMode="while-editing"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="map"
                name="clientAddressStreetOne"
                textContentType="streetAddressLine1"
                editable={edit}
                defaultValue={values.clientAddressStreetOne}
                clearButtonMode="while-editing"
                title="Street Address "
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="map"
                name="clientAddressStreetTwo"
                textContentType="streetAddressLine2"
                placeholder="Street address Line 2"
                editable={edit}
                defaultValue={values.clientAddressStreetTow}
                clearButtonMode="while-editing"
                title="Street address Line 2"
              />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="map"
                name="clientAddressLocality"
                textContentType="addressCity"
                title="Locality"
                editable={edit}
                defaultValue={values.clientAddressLocality}
                clearButtonMode="while-editing"
              />
              <FormPicker
                data={projectTypePicker}
                selectedItem={projectType}
                onItemSelect={(item) => setProjectType(item)}
                numOfColumns={3}
                icon="progress-question"
                placeholder="Project Type"
                title="Project Type"
                name="projectTypePicker"
                disabled={!edit}
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
                disabled={!edit}
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
                disabled={!edit}
              />

              <CheckBox
                name="indoor"
                placeholder="indoor"
                choiceOne="Yes"
                choiceTwo="No"
                onPress={setPoolIndoorValue}
                selected={indoor}
                enabled={!edit}
              />
              <CheckBox
                name="mosaicOrTile"
                placeholder="Mosaic or Tile"
                choiceOne="Mosaic"
                choiceTwo="Tile"
                onPress={setPoolTileValue}
                selected={poolTile}
                enabled={!edit}
              />
              <CheckBox
                name="poolSteps"
                placeholder="Pool Steps"
                choiceOne="Yes"
                choiceTwo="No"
                onPress={setPoolStepsValue}
                selected={poolSteps}
                enabled={!edit}
              />
              <CheckBox
                name="poolLeaking"
                placeholder="Pool Leaking"
                choiceOne="Yes"
                choiceTwo="No"
                onPress={setPoolLeakingValue}
                selected={poolLeaking}
                enabled={!edit}
              />

              {/* pool calculation input  */}
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                clearButtonMode="while-editing"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                defaultValue={
                  values.poolLength ? values.poolLength.toString() : "0"
                }
                onChangeText={(lengthValue) => setPoolLength(lengthValue)}
                placeholder="ex: 23"
                title="pool Length"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                clearButtonMode="while-editing"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                defaultValue={
                  values.poolWidth ? values.poolWidth.toString() : "0"
                }
                onChangeText={(widthValue) => setPoolWidth(widthValue)}
                placeholder="ex: 23"
                title="Pool Width"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={
                  values.poolDepthStart ? values.poolDepthStart.toString() : "0"
                }
                clearButtonMode="while-editing"
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
                editable={edit}
                defaultValue={
                  values.poolDepthEnd ? values.poolDepthEnd.toString() : "0"
                }
                clearButtonMode="while-editing"
                autoCorrect={false}
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                onChangeText={(depthEndValue) => setPoolDepthEnd(depthEndValue)}
                placeholder="ex: 23"
                title="Pool Depth End"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={
                  values.poolPerimeter ? values.poolPerimeter.toString() : "0"
                }
                clearButtonMode="while-editing"
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
                editable={edit}
                defaultValue={
                  values.poolCopingPerimeter
                    ? values.poolCopingPerimeter.toString()
                    : "0"
                }
                clearButtonMode="while-editing"
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
                editable={edit}
                defaultValue={
                  values.balanceTankLength
                    ? values.balanceTankLength.toString()
                    : "0"
                }
                clearButtonMode="while-editing"
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
                editable={edit}
                defaultValue={
                  values.balanceTankWidth
                    ? values.balanceTankWidth.toString()
                    : "0"
                }
                clearButtonMode="while-editing"
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
                editable={edit}
                defaultValue={
                  values.balanceTankDepth
                    ? values.balanceTankDepth.toString()
                    : "0"
                }
                clearButtonMode="while-editing"
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
                editable={edit}
                defaultValue={
                  values.balanceTankPipe
                    ? values.balanceTankPipe.toString()
                    : "0"
                }
                clearButtonMode="while-editing"
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
                editable={edit}
                defaultValue={
                  values.numberOfWallInlets
                    ? values.numberOfWallInlets.toString()
                    : "0"
                }
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="numberOfWallInlets"
                onChangeText={(numberOfWallInletsValue) =>
                  setNumberOfWallInlets(numberOfWallInletsValue)
                }
                title="No. of Wall inlets"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={
                  values.numberOfSumps ? values.numberOfSumps.toString() : "0"
                }
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="numberOfSumps"
                onChangeText={(numberOfSumpsValue) =>
                  setNumberOfSumps(numberOfSumpsValue)
                }
                title="No. of Sumps"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={
                  values.numberOfSkimmers
                    ? values.numberOfSkimmers.toString()
                    : "0"
                }
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="numberOfSkimmers"
                onChangeText={(numberOfSkimmersValue) =>
                  setNumberOfSkimmers(numberOfSkimmersValue)
                }
                title="No. of skimmers"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={
                  values.numberOfLights ? values.numberOfLights.toString() : "0"
                }
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="numberOfLights"
                onChangeText={(numberOfLightsValue) =>
                  setNumberOfLights(numberOfLightsValue)
                }
                title="No. of Lights"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={values.spaJets ? values.spaJets.toString() : "0"}
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="spaJets"
                onChangeText={(spaJetsValue) => setSpaJets(spaJetsValue)}
                title="No. of Spa Jets"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={
                  values.counterCurrent ? values.counterCurrent.toString() : "0"
                }
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="counterCurrent"
                onChangeText={(counterCurrentValue) =>
                  setCounterCurrent(counterCurrentValue)
                }
                title="Counter Current"
              />
              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={
                  values.vacuumPoints ? values.vacuumPoints.toString() : "0"
                }
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                placeholder="ex: 23"
                name="vacuumPoints"
                onChangeText={(vacuumPointsValue) =>
                  setVacuumPoints(vacuumPointsValue)
                }
                title="Vacuum points"
              />

              <AppFormField
                autoCapitalize="none"
                editable={edit}
                defaultValue={
                  values.poolVolume ? values.poolVolume.toString() : "0"
                }
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="move-resize-variant"
                onChangeText={(volumeValue) => setPoolVolume(volumeValue)}
                title="Pool Volume"
              />

              <AppFormField
                autoCapitalize="none"
                editable={!edit}
                defaultValue={values.Price ? values.Price.toString() : "5500"}
                clearButtonMode="while-editing"
                keyboardType="decimal-pad"
                icon="currency-eur"
                onChangeText={(volumeValue) => setPoolVolume(volumeValue)}
                title="Price"
              />

              <AppFormField
                autoCapitalize="sentences"
                editable={edit}
                defaultValue={
                  values.description
                    ? values.description
                    : "Type a description or extra remarks"
                }
                clearButtonMode="while-editing"
                autoCorrect
                name="description"
                placeholder="Type a description or extra remarks"
                title="Description"
                numberOfLines={5}
                multiline
              />
              <ItemsListPicker
                data={ItemsAddOnsListValue}
                onItemRemove={onItemAddOnsRemove}
                onItemAdd={onItemAddOnsAdded}
                Items={ItemsAddOnsSelectedValue}
                disabled={!edit}
              />
              <SubmitButton
                title="Save"
                visible={edit}
                iconName="content-save-check"
              />
            </AppForm>
          </View>
          {/* Map area */}
          <View style={styles.mapViewBox}>
            <MapView
              initialRegion={{
                latitude: 35.878173828125,
                longitude: 14.396160663677879,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              style={styles.map}
            >
              {values.location && (
                <Marker
                  coordinate={values.location}
                  pinColor={customProps.secondaryColor}
                >
                  <Callout>
                    <Text>{values.title}</Text>
                  </Callout>
                </Marker>
              )}
            </MapView>
          </View>
          {/* Created by area */}
          <View style={styles.userContainer}>
            <ListItem
              title={values.user.name}
              subTitle={values.user.role}
              imagePath={values.user.image}
              styleParameter={{ backgroundColor: "transparent" }}
              disabled={true}
            />
          </View>
          {/* Comments Area */}
          <ScrollView
            horizontal
            scrollEnabled={false}
            disabled
            style={{
              width: "95%",
              flex: 1,
              alignSelf: "center",
              flexDirection: "column",
              marginBottom: 30,
            }}
          >
            {!error ? (
              <View style={styles.form}>
                <Image
                  resizeMode="contain"
                  style={{ width: "100%", height: 225, marginVertical: 10 }}
                  source={require("../assets/Images/heroImages/discussion.png")}
                />
                <AppForm
                  initialValues={{ message: "" }}
                  onSubmit={handleCommentSubmit}
                  validationSchema={validationSchema}
                >
                  <FlatList
                    style={styles.list}
                    data={data}
                    keyExtractor={(comment) => comment.id.toString()}
                    refreshing={loading}
                    onContentSizeChange={() =>
                      scrollViewRef.current.scrollToEnd()
                    }
                    ref={scrollViewRef}
                    onRefresh={() => request(values.id)}
                    renderItem={({ item }) => (
                      <MessageView
                        title={
                          item.user.name === user.name ? "you" : item.user.name
                        }
                        subTitle={item.comment}
                        disabled={true}
                        imagePath={item.user.image[0]}
                        dateTime={item.dateTime}
                        right={item.user.name === user.name}
                      />
                    )}
                  />

                  <AppFormField name="message" placeholder="Leave a note 🙂" />
                  <SubmitButton title="Post" iconName="post" width={250} />
                </AppForm>
              </View>
            ) : (
              <DataLoadingError
                visible={error}
                text="Couldn't load comments from the server"
                onPress={() => fetchData()}
              />
            )}
          </ScrollView>
        </TriggeringView>
      </ImageHeaderScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  navTitle: {
    ...customProps.font,
    fontWeight: "800",
    fontSize: 30,
    color: customProps.primaryColorLight,
    position: "absolute",
    top: -100,
    textAlign: "center",
    alignSelf: "center",
    maxWidth: 220,
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  headerTitle: {
    ...customProps.font,
    fontWeight: "900",
    fontSize: 50,
    color: customProps.primaryColorLight,
    textAlign: "center",
    shadowColor: customProps.primaryColorDark,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  headerTitleBox: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
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
  mapViewBox: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    height: 350,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
    margin: 10,
  },
  map: {
    width: "100%",
    height: "100%",
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
  image: {
    width: "100%",
    height: 330,
    opacity: 0.9,
  },
  price: {
    color: customProps.secondaryColor,
    fontSize: 18,
  },
  userContainer: {
    marginTop: 5,
    width: "95%",
    alignSelf: "center",
  },
});
