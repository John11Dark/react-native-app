// third parties dependencies
import {
  Alert,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Transition, Transitioning } from "react-native-reanimated";
// custom dependencies
import {
  Dialog,
  Header,
  Icon,
  ImageInput,
  ListItem,
  PrimaryButton,
  Wrapper,
} from "../components";
import { customProps } from "../config";

export default function Role({
  label = "image",
  dataProp,
  headerTitle = "images",
}) {
  // ? * -->  variables
  const folders = [
    {
      id: 11,
      label: "Skimmer",
      iconName: "folder-multiple-image",
      images: [
        {
          id: 1,
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
        {
          id: 2,
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
        {
          id: 3,
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
        {
          id: 4,
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
        {
          id: 5,
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
        {
          id: 6,
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
      ],
    },
    {
      id: 12,
      label: "Overflow",
      iconName: "folder-multiple-image",
      images: [
        {
          id: "OV2",
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
      ],
    },
    {
      id: 13,
      label: "Online",
      iconName: "folder-multiple-image",
      images: [
        {
          id: "O3",
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
      ],
    },
    {
      id: 14,
      label: "Saved",
      iconName: "folder-multiple-image",
      images: [
        {
          id: "SA4",
          uri: "http://192.168.1.181:9000/assets/JohnMuller_full.jpg",
        },
      ],
    },
  ];
  const numOfLines = 1;

  // ? * --> components
  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={200} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={300} />
    </Transition.Together>
  );

  // ? * --> States
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [data, setData] = useState(dataProp ? dataProp : folders);
  const [selected, setSelected] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [saveButtonVisible, setSaveButtonVisible] = useState(false);
  // ? * -->  refs
  const transitionRef = useRef();

  // ? * --> Functions
  const submit = async () => {
    const result = 1 + 1;
    return result;
  };
  // ? * --> Main
  return (
    <Wrapper scrollBarVisible={false}>
      <Header goBack title={headerTitle} searchBar={false} />

      <Transitioning.View transition={transition} ref={transitionRef}>
        <ScrollView
          horizontal
          scrollEnabled={false}
          style={{
            flex: 1,
            width: "100%",
            marginVertical: 10,
          }}
          contentContainerStyle={{ width: "100%" }}
          showsHorizontalScrollIndicator={false}
        >
          <FlatList
            scrollEnabled={false}
            data={data}
            keyExtractor={(folder) => folder.id}
            numColumns={numOfLines}
            style={styles.container}
            renderItem={({ item, index }) => {
              return (
                <>
                  <ListItem
                    marginBottom={0}
                    key={item.id}
                    subTitle={`${item.images.length}  ${
                      item.images.length > 1 ? label + "s" : label
                    }`}
                    IconComponent={
                      <Icon
                        backgroundColor={"transparent"}
                        innerSize={40}
                        size={40}
                        name={item.iconName}
                        disabled
                        iconColor={customProps.secondaryColor}
                      />
                    }
                    title={item.label}
                    onPress={() => {
                      transitionRef?.current?.animateNextTransition();
                      setCurrentIndex(currentIndex === index ? null : index);
                    }}
                    style={
                      currentIndex === index
                        ? styles.ListItemOpen
                        : styles.ListItem
                    }
                  />
                  {currentIndex === index && (
                    <View style={styles.childrenViw}>
                      {setCurrentItem(data[index].images)}
                      {currentItem?.map(({ id, uri }) => (
                        <TouchableOpacity
                          key={id}
                          onPress={() => {
                            setSelected(
                              selected?.id === id ? null : { uri, id }
                            );
                          }}
                        >
                          {selected?.id === id && (
                            <Icon
                              name={"checkbox-marked-circle"}
                              iconColor={customProps.primaryColor}
                              style={styles.icon}
                            />
                          )}
                          <Image
                            source={{ uri }}
                            style={[
                              styles.itemStyle,
                              selected?.id === id ? styles.selected : undefined,
                            ]}
                          />
                        </TouchableOpacity>
                      ))}
                      <ImageInput
                        marginLeft={4}
                        size={120}
                        borderRadius={10}
                        onImageChange={(uri) => {
                          data[index].images.push({
                            id: data[index].images.length + 1,
                            uri: uri,
                          });
                          setCurrentItem([
                            ...currentItem,
                            {
                              id: data[index].images.length + 1,
                              uri: uri,
                            },
                          ]);
                        }}
                      />
                    </View>
                  )}
                </>
              );
            }}
          />
        </ScrollView>
      </Transitioning.View>

      <ListItem
        marginBottom={30}
        style={styles.ListItem}
        onPress={() =>
          Platform.OS === "ios"
            ? Alert.prompt("File System", "insert folder name", [
                { text: "cancel" },
                {
                  text: "Ok",
                  onPress: (text) =>
                    text?.length > 0
                      ? setData([
                          ...data,
                          {
                            id: data.length + 1,
                            label: text,
                            iconName: "folder-multiple-image",
                            images: [],
                          },
                        ])
                      : alert("Folder name is required"),
                },
              ])
            : setDialogVisible(true)
        }
        title={"create new Folder"}
        IconComponent={
          <Icon
            name={"folder-plus"}
            backgroundColor={"transparent"}
            innerSize={50}
            size={50}
            disabled
            iconColor={customProps.primaryColor}
          />
        }
      />
      <PrimaryButton
        title={"Post"}
        handlePress={() => submit()}
        visible={saveButtonVisible}
      />
      <Dialog
        visible={dialogVisible}
        title={"File System"}
        description={"insert folder name"}
        buttons={[
          {
            text: "cancel",
            onPress: () => {
              setDialogVisible(false);
            },
          },
          {
            text: "Ok",
            onPress: (text) => {
              text?.length > 0
                ? setData([
                    ...data,
                    {
                      id: data.length + 1,
                      label: text,
                      iconName: "folder-multiple-image",
                      images: [],
                    },
                  ])
                : alert("Folder name is required"),
                setDialogVisible(false);
            },
          },
        ]}
      />
    </Wrapper>
  );
}

// ? * --> Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  ListItem: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      margin: 10,
      backgroundColor: customProps.darkOpacity,
      width: "95%",
      alignSelf: "center",
      justifyContent: "flex-start",
      borderRadius: 10,
    },
  },
  ListItemOpen: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      margin: 10,
      backgroundColor: customProps.TertiaryColor,
      width: "95%",
      alignSelf: "center",
      justifyContent: "flex-start",
      borderRadius: 10,
      shadowColor: customProps.primaryColor,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 0,
      elevation: 4,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      marginBottom: 0,
    },
  },
  label: {
    ...customProps.font,
    color: customProps.secondaryColor,
    textTransform: "capitalize",
    paddingLeft: 10,
  },
  childrenViw: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    flexWrap: "wrap",
    margin: 10,
    marginTop: 0,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: customProps.darkOpacity,
    shadowColor: customProps.primaryColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 4,
    width: "95%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  itemStyle: {
    width: 120,
    height: 120,
    margin: 3,
    borderRadius: 10,
  },
  selected: {
    borderWidth: 2,
    borderColor: customProps.secondaryColor,
  },
  icon: {
    position: "absolute",
    top: 0,
    zIndex: 12,
    right: 1,
  },
});
