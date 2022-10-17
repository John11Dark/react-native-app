import React, { useEffect, useState } from "react";
import { FlatList, View, Image, Text, StyleSheet, Alert } from "react-native";
import { customProps } from "../../config";
//import messagesApi from "../api/messages";
//import { useApi } from "../hooks";
import {
  Header,
  Screen,
  //DataLoadingError,
  //ListItem,
  //DeleteItemAction,
  //ListItemSeparator,
} from "../../components";
const MessagesScreen = () => {
  // const { data, error, loading, request } = useApi(messagesApi.getMessages);
  // const [messages, setMessages] = useState(data);
  // const handlePress = (message) => {};

  // const removeMessage = async (message) => {
  //   try {
  //     const result = await messagesApi.deleteMessage({ messageId: message.id });
  //     if (!result.ok) throw result.originalError;
  //     setMessages(messages.filter((messageName) => messageName !== message));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDelete = (message) => {
  //   Alert.alert(
  //     "Delete Message",
  //     "Are you sure you want to Delete this Message?",
  //     [{ text: "Yes", onPress: () => removeMessage(message) }, { text: "No" }]
  //   );
  // };

  //   useEffect(() => {
  //     request();
  //     setMessages(data);
  //   }, [messages]);
  //   return (
  //     <Screen>
  //       {data ? (
  //         <FlatList
  //           style={styles.list}
  //           data={data}
  //           keyExtractor={(message) => message.id.toString()}
  //           renderItem={({ item }) => (
  //             <ListItem
  //               title={item.fromUser.name}
  //               subTitle={item.content}
  //               imagePath={item.fromUser.image.images[0].url}
  //               onPress={() => handlePress(item)}
  //               renderRightActions={() => (
  //                 <DeleteItemAction onPress={() => handleDelete(item)} />
  //               )}
  //             />
  //           )}
  //           ItemSeparatorComponent={ListItemSeparator}
  //           refreshing={loading}
  //           onRefresh={() => request()}
  //         />
  //       ) : (
  //         <DataLoadingError
  //           visible={error}
  //           text="Couldn't get messages from server"
  //           onPress={() => request()}
  //         />
  //       )}
  //     </Screen>
  //   );
  //

  let notifiedBefore = true;
  if (!notifiedBefore) {
    alert(
      "This functionality are not available at the moment!\nWhen it is available you will be notified!🙂"
    );
  }
  return (
    <Screen>
      <Header title={"Messages"} goBack />
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require("../../assets/Images/heroImages/Messages.png")}
        />
        <Text style={styles.text}>
          Sorry the messages functionality are not available at the moment!
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    alignSelf: "center",
    height: 350,
  },
  text: {
    ...customProps.font,
    fontSize: customProps.largePrimaryTextFontSize,
    textAlign: "center",
    color: customProps.primaryColorLight,
    fontWeight: "700",
    margin: 10,
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MessagesScreen;
