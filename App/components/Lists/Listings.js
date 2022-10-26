import React from "react";
import { StyleSheet, FlatList, Image, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Card, DataLoadingError, Screen, Header } from "../";
import customProps from "../../config/customProps";
import Routes from "../../Navigation/routes";

const Listings = ({
  data,
  error,
  loading,
  onRefresh,
  goBack = false,
  itemNavigationRoute = Routes.LISTING_DETAILS,
  handleState,
  headerTitle,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
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
          ListHeaderComponent={
            <Header title={headerTitle} goBack={goBack} searchBar={false} />
          }
          stickyHeaderHiddenOnScroll={true}
          onEndReachedThreshold={0.01}
          // onEndReached={(info) => console.log(info)}
        />
        <View style={styles.bottomContainer}>
          <Image
            resizeMode="contain"
            source={require("../../assets/Images/heroImages/HomeScreenHeroImage.png")}
          />
          <Text>you're all caught up</Text>
          <Text>you have seen all posts</Text>
        </View>
      </Screen>
      <DataLoadingError
        visible={error}
        onPress={onRefresh}
        imageViable
        text="Could not retrieve Feeds from the Server."
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customProps.primaryColorDark,
  },
  bottomContainer: {
    margin: 10,
    overflow: "hidden",
    height: 100,
    width: "95%",
    alignItems: "center",
    display: "none",
  },
});

export default Listings;
