//import React, { useEffect, useState } from "react";
//import { FlatList, StyleSheet, Alert } from "react-native";
import { Image } from "react-native";

//import messagesApi from "../api/messages";
//import { useApi } from "../hooks";
import {
  Screen,
  //DataLoadingError,
  //ListItem,
  //DeleteItemAction,
  //ListItemSeparator,
} from "../components";

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

  alert(
    "This functionality are not available at the moment!\nWhen it is available you will be notified!🙂"
  );
  return (
    <Screen>
      <Image
        resizeMode="contain"
        style={{
          width: "95%",
          height: "100%",
          alignSelf: "center",
          transform: [{ translateY: 105 }],
        }}
        source={require("../assets/Images/heroImages/notAvailableAtTheMoment.png")}
      />
    </Screen>
  );
};

// const styles = StyleSheet.create({
//   list: {
//     flex: 1,
//   },
// });

export default MessagesScreen;
