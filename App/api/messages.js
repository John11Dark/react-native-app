import client from "./client";

const getMessages = () => client.get("/messages");

const sendMessage = (messageInfo) => client.post("/messages", messageInfo);

const deleteMessage = (messageId) => client.delete("/messages", messageId);
export default {
  getMessages,
  sendMessage,
  deleteMessage,
};
