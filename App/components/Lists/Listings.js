import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Card, DataLoadingError, Screen, Header } from "../";
import customProps from "../../config/customProps";
import Routes from "../../Navigation/routes";

const Listings = ({
  data,
  error,
  loading,
  onRefresh,
  itemNavigationRoute = Routes.LISTING_DETAILS,
  handleState,
  headerTitle,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <DataLoadingError
          visible={error}
          onPress={onRefresh}
          text="Could not retrieve Feeds from the Server."
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={() => onRefresh()}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              imageUrl={item.images[0].url}
              thumbnailUrl={item.images[0].thumbnail}
              onPress={() => navigation.navigate(itemNavigationRoute, item)}
              title={item.site}
              subTitle={item.description}
              user={item.user}
              status={item.status}
              archive={item.isInArchive}
              restore={item.isInRecycleBin}
              initialDate={item.initialDate}
              listId={item.id}
              handleState={handleState}
              poolType={item.poolType}
            />
          )}
          ListHeaderComponent={<Header title={headerTitle} searchBar={false} />}
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
