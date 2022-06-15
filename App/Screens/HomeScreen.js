import { Button, FlatList, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";

import Card from "../components/Lists/Card";
import ItemSeparator from "../components/Lists/ItemsSeparator";
import Screen from "../components/Screen";
import Styles from "../config/Styles/Styles";

const initialProjects = [
  {
    id: 1,
    initialDate: "2022/12/1",
    status: false,
    image: require("../assets/Images/heroImages/img.jpg"),
    title: "first pool ",
    description: "this is the first project",
    address: {
      locality: "Rabat",
      streetAddress: "49 Triq ",
      streetAddressLineTwo: " had-ingle",
    },
    poolType: "overFlow",
    typeAQuestion: "spa",
    poolLocation: "ground",
    poolSteps: true,
  },
  {
    id: 2,
    initialDate: "2022/12/1",
    status: false,
    image: require("../assets/Images/heroImages/img.jpg"),
    title: "second pool ",
    description: "this is the first project",
    address: {
      locality: "Rabat",
      streetAddress: "49 Triq ",
      streetAddressLineTwo: " had-ingle",
    },
    poolType: "overFlow",
    typeAQuestion: "spa",
    poolLocation: "ground",
    poolSteps: true,
  },
  {
    id: 3,
    initialDate: "2022/12/1",
    status: false,
    image: require("../assets/Images/heroImages/img.jpg"),
    title: "third pool ",
    description: "this is the first project",
    address: {
      locality: "Rabat",
      streetAddress: "49 Triq ",
      streetAddressLineTwo: " had-ingle",
    },
    poolType: "overFlow",
    typeAQuestion: "spa",
    poolLocation: "ground",
    poolSteps: true,
  },
];
export default function HomeScreen({ userName = "John Muller", navigation }) {
  const [projects, setProjects] = useState(initialProjects);
  const [refreshing, setRefreshing] = useState(false);
  const backgroundStoredProjects = [];
  const removeHandlePress = (project) => {
    // remove project from client app
    setProjects(
      backgroundStoredProjects.push(project.id),
      projects.filter((projectSelection) => projectSelection.id !== project.id)
    );
  };
  return (
    <Screen style={Styles.container}>
      <View style={Styles.textContainer}>
        <Image
          resizeMode="contain"
          style={Styles.primaryImage}
          source={require("../assets/Images/heroImages/HomeScreenHeroImage.png")}
        />
        <Text style={Styles.secondaryTextHeroSection}>Hey, {userName} 👋</Text>
      </View>
      <FlatList
        style={{ flex: 1, width: "90%" }}
        data={projects}
        keyExtractor={(project) => project.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            initialDate={item.initialDate}
            subTitle={item.description}
            status={item.status}
            imagePath={item.image}
            onPress={() => navigation.navigate("ListingDetails", item)}
            removeHandlePress={removeHandlePress}
          />
        )}
        ItemSeparatorComponent={() => <ItemSeparator />}
        refreshing={refreshing}
        onRefresh={() => {
          setProjects([
            {
              id: 4,
              initialDate: "2022/12/1",
              status: false,
              image: require("../assets/Images/heroImages/img.jpg"),
              title: "Fourth pool ",
              description: "this is the first project",
              address: {
                locality: "Rabat",
                streetAddress: "49 Triq ",
                streetAddressLineTwo: " had-ingle",
              },
            },
          ]);
        }}
      />
    </Screen>
  );
}
