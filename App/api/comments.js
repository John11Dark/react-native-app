import client from "./client";

const endpoint = "comments/";

const getComments = (id) => client.get(endpoint + id);

const postComment = async (comment) => {
  const res = await client.post(endpoint, comment);
  return res;
};
export default {
  getComments,
  postComment,
};
