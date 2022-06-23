import { FlatList, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";

import {
  Screen,
  DataLoadingError,
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components";

import messagesApi from "../api/messages";
import { useApi } from "../hooks";

const MessagesScreen = () => {
  const { data, error, loading, request } = useApi(messagesApi.getMessages);

  useEffect(() => {
    request();
  }, []);

  const handlePress = (message) => {};

  const handleDelete = (message) => {};

  return (
    <Screen>
      <DataLoadingError
        visible={error}
        text="Couldn't get messages from server"
        onPress={() => request()}
      />
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(message) => message._id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            description={item.body}
            image={item.image}
            onPress={() => handlePress(item)}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={loading}
        onRefresh={() => request()}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default MessagesScreen;
