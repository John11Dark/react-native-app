// ? * --> Third parties Libraries
import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// ? * --> App libraries
import { errorApi, listingsApi } from "../../api";
import Routes from "../../Navigation/routes";
import { customProps } from "../../config";
import Icon from "../Interface/Icon";
export default function ButtonsList({ values, user }) {
  // ? * -->  hooks
  const navigation = useNavigation();
  // ? * --> refs

  // ? * --> States

  const [status, setStatus] = useState(values.status);
  const [edit, setEdit] = useState(false);

  // ? * -->  Functions

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
  return (
    <View style={styles.container}>
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
  container: {
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
  label: {
    color: customProps.secondaryColor,
    padding: 10,
    fontSize: 25,
    fontFamily: "Avenir",
    fontWeight: "800",
    textTransform: "capitalize",
  },
});
