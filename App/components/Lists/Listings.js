import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ActivityIndicator, Card, DataLoadingError, Screen } from "../";
import customProps from "../../config/customProps";
import Routes from "../../Navigation/routes";

const Listings = ({
  data,
  error,
  loading,
  onRefresh,
  itemNavigationRoute = Routes.LISTING_DETAILS,
}) => {
  const navigation = useNavigation();

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <DataLoadingError
          visible={error}
          onPress={onRefresh}
          text="Couldn't retrieve the listings."
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(itemNavigationRoute, item)}
              thumbnailUrl={item.images[0].thumbnail}
              title={item.title}
              subTitle={item.price}
            />
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={() => onRefresh()}
        />
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: customProps.primaryColorDark,
  },
});

export default Listings;
