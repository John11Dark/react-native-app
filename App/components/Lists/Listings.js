import React from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
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
  handleState,
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              imageUrl={item.images[0].url}
              thumbnailUrl={item.images[0].thumbnail}
              onPress={() => navigation.navigate(itemNavigationRoute, item)}
              title={item.title}
              subTitle={item.description}
              user={item.user}
              status={item.status ? item.status : item.isInArchive}
              archive={item.isInArchive}
              restore={item.isInRecycleBin}
              initialDate={item.initialDate}
              listId={item.id}
              handleState={handleState}
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
    backgroundColor: customProps.primaryColorDark,
  },
});

export default Listings;
