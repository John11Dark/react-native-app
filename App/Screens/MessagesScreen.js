// import { FlatList, StyleSheet } from "react-native";
// import React, { useEffect } from "react";

// import DataLoadingError from "../components/DataLoadingError";
// import ListItem from "../components/Lists/ListItem";
// import ListItemDeleteAction from "../components/DeleteItemAction";
// import ListItemSeparator from "../components/Lists/ItemsSeparator";
// import Wrapper from "../components/Wrapper";
// import messagesApi from "../api/messages";
// import { useApi } from "../hooks";

// const Messages = () => {
//   const { data, error, loading, request } = useApi(messagesApi.getMessages);

//   useEffect(() => {
//     request();
//   }, []);

//   const handlePress = (message) => {};

//   const handleDelete = (message) => {};

//   return (
//     <Wrapper>
//       <DataLoadingError
//         visible={error}
//         text="Couldn't get messages from server"
//         onPress={() => request()}
//       />
//       <FlatList
//         style={styles.list}
//         data={data}
//         keyExtractor={(message) => message._id.toString()}
//         renderItem={({ item }) => (
//           <ListItem
//             title={item.title}
//             description={item.body}
//             image={item.image}
//             onPress={() => handlePress(item)}
//             renderRightActions={() => (
//               <ListItemDeleteAction onPress={() => handleDelete(item)} />
//             )}
//           />
//         )}
//         ItemSeparatorComponent={ListItemSeparator}
//         refreshing={loading}
//         onRefresh={() => request()}
//       />
//     </Wrapper>
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     flex: 1,
//   },
// });

// export default Messages;
