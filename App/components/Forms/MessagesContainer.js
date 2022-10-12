// ? * --> Third parties Libraries
import React, { useEffect, useState, useRef } from "react";
import {
  Keyboard,
  StyleSheet,
  View,
  Alert,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

// ? * --> App libraries
import { errorApi, commentsApi } from "../../api";
import { useNotifications, useApi } from "../../hooks";
import AppForm from "./AppForm";
import AppFormField from "./AppFormField";
import SubmitButton from "./SubmitButton";
import MessageView from "../Lists/MessageView";
import DataLoadingError from "../DataLoadingError";
import ErrorMessage from "./ErrorMessage";

export default function MessagesContainer({ user, listId }) {
  // ? * -->  Functions
  // * -->// handle update submit list
  const handleCommentSubmit = async ({ message }, { resetForm }) => {
    try {
      Keyboard.dismiss();
      const comment = {
        comment: message,
        listingId: listId,
        id: discussionData.length + 1 + message,
        dateTime: new Date().toDateString(),
        user: {
          name: user.name,
          id: user.id,
          image: user.image,
        },
      };
      const result = await commentsApi.postComment(comment);
      if (!result.ok) {
        errorApi.sendError({
          name: "postComment",
          originalError: result.originalError,
          errorMessage: result.message ? result.message : undefined,
          result: result,
          user: user,
        });
        throw result.originalError;
      }

      scheduleLocalNotification("Info", "Your comment has been posted!", {
        navigate: "ListingDetails",
      });
      resetForm();
      setDiscussionData(comment);
    } catch (error) {
      errorApi.sendError({
        user: user,
        name: "try catch useNotifications 'comment'",
        errorMessage: error,
      });
    }
  };
  // ? * --> Hooks
  const { data, loading, error, request } = useApi(commentsApi.getComments);
  const isFocused = useIsFocused();
  const { scheduleLocalNotification } = useNotifications();

  // ? * -->  Refs
  const scrollViewRef = useRef(null);

  // ? * --> States

  // * --> // Comments State
  const [discussionData, setDiscussionData] = useState([]);
  useEffect(() => {
    if (isFocused) request();
    setDiscussionData(data);
  }, [isFocused, discussionData]);
  return (
    <ScrollView
      horizontal
      scrollEnabled={false}
      disabled
      style={{
        width: "95%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "column",
        marginBottom: 30,
      }}
    >
      {!error ? (
        <View style={styles.form}>
          <Image
            resizeMode="contain"
            style={{ width: "100%", height: 225, marginVertical: 10 }}
            source={require("../../assets/Images/heroImages/discussion.png")}
          />
          <AppForm
            initialValues={{ message: "" }}
            onSubmit={handleCommentSubmit}
          >
            <FlatList
              style={styles.list}
              data={data}
              keyExtractor={(comment) => comment.id.toString()}
              refreshing={loading}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
              ref={scrollViewRef}
              onRefresh={() => request(values.id)}
              renderItem={({ item }) => (
                <MessageView
                  title={item.user.name === user.name ? "you" : item.user.name}
                  subTitle={item.comment}
                  disabled={true}
                  imagePath={
                    item.user.image[0]
                      ? item.user.image[0]
                      : "https://cdn-icons-png.flaticon.com/128/149/149071.png"
                  }
                  dateTime={item.dateTime}
                  right={item.user.name === user.name}
                />
              )}
            />

            <AppFormField name="message" placeholder="Leave a note 🙂" />
            <SubmitButton title="Post" iconName="post" width={250} />
          </AppForm>
        </View>
      ) : (
        <DataLoadingError
          visible={error}
          text="Couldn't load comments from the server"
          onPress={() => fetchData()}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {},
});
