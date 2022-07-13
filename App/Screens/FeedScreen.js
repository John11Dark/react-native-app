import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useApi, useAuth } from "../hooks";
import listingsApi from "../api/listings";
import Listings from "../components/Lists/Listings";
import Routes from "../Navigation/routes";
export default function FeedScreen({ route }) {
  const allListings = useApi(listingsApi.getListings);
  const userListings = useApi(listingsApi.getUserListings);
  const { user } = useAuth();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (route.params?.userListings) {
      userListings.request(user.userId);
    } else {
      allListings.request();
    }
  }, [route.params?.userListings, isFocused]);
  return route.params?.userListings ? (
    <Listings
      data={userListings.data}
      error={userListings.error}
      itemNavigationRoute={Routes.USER_LISTING_DETAILS}
      loading={userListings.loading}
      onRefresh={() => {
        userListings.request(user.userId);
      }}
    />
  ) : (
    <Listings
      data={allListings.data}
      error={allListings.error}
      loading={allListings.loading}
      onRefresh={allListings.request}
    />
  );
}
