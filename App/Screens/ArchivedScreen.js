// third parties libraries
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// custom libraries
import { listingsApi, errorApi } from "../api";
import { useApi } from "../hooks";
import Listings from "../components/Lists/Listings";
import routes from "../Navigation/routes";

const ArchivedScreen = ({ route }) => {
  // hooks
  const { data, error, loading, request } = useApi(
    listingsApi.getArchivedListings
  );
  const isFocused = useIsFocused();
  // functions
  const unarchiveRequest = async (id) => {
    try {
      const result = await listingsApi.unarchive(id);
      if (!result.ok) throw result.originalError;
      request();
    } catch (error) {
      errorApi.sendError({ catchError: error, user: "user" });
    }
  };
  const handleArchiveState = (id) => {
    Alert.alert("Archive", "are you sure to unarchive this list?", [
      {
        text: "Yes",
        style: "destructive",
        onPress: () => unarchiveRequest(id),
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  // effect
  useEffect(() => {
    if (route.params?.userArchivedListings) {
      if (isFocused == true) request();
    } else {
      if (isFocused == true) request();
    }
  }, [route.params?.userArchivedListings, isFocused]);
  return route.params?.userArchivedListings ? (
    <Listings
      headerTitle={"Archived"}
      data={data}
      error={error}
      itemNavigationRoute={routes.ARCHIVED_LISTING_DETAILS}
      loading={loading}
      onRefresh={request}
      handleState={(id) => handleArchiveState(id)}
    />
  ) : (
    <Listings
      headerTitle={"Archived"}
      data={data}
      error={error}
      itemNavigationRoute={routes.ARCHIVED_LISTING_DETAILS}
      loading={loading}
      onRefresh={request}
      handleState={(id) => handleArchiveState(id)}
    />
  );
};

export default ArchivedScreen;
