import Constants from "expo-constants";

import client from "./client";

const endpoint = "/errors/";

const getErrors = () => client.get(endpoint);

const sendError = async (error) => {
  const res = await client.post(endpoint, { Error: error, device: Constants });
  return res;
};
const sendLog = async (error) => {
  const res = await client.post(endpoint, { Error: error, device: Constants });
  return res;
};
export default {
  getErrors,
  sendError,
  sendLog,
};
