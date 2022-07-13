// third parties libraries
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// custom libraries
import { listingsApi, errorApi } from "../api";
import { useApi } from "../hooks";
import Listings from "../components/Lists/Listings";
import routes from "../Navigation/routes";

const RecycleBinScreen = ({ route }) => {
  // hooks
  const isFocused = useIsFocused();
  const { data, error, loading, request } = useApi(
    listingsApi.getRecycleBinListings
  );

  // functions
  const restoreRequest = async (id) => {
    try {
      const result = await listingsApi.restoreList(id);
      if (!result.ok) throw result.originalError;
      request();
    } catch (error) {
      Alert.alert("Info", "an error occurred..");
      errorApi.sendError({ catchError: error, user: "user" });
    }
  };
  const handleRestore = (id) => {
    Alert.alert("Recycle bin", "are you sure to restore this list?", [
      {
        text: "Yes",
        onPress: () => restoreRequest(id),
        style: "destructive",
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  };

  // effect
  useEffect(() => {
    if (isFocused == true) request();
  }, [isFocused]);
  return (
    <Listings
      data={data}
      error={error}
      itemNavigationRoute={routes.RECYCLE_BIN_LISTING_DETAILS}
      loading={loading}
      onRefresh={request}
      handleState={(id) => handleRestore(id)}
    />
  );
};

export default RecycleBinScreen;
