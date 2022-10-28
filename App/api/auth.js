import client from "./client";
import { getExtension, getImageType } from "../utils";

const login = (email, password) => client.post("/auth", { email, password });

const register = (userInfo) => {
  const data = new FormData();
  data.append("flag", "user");
  data.append("name", userInfo.name);
  data.append("username", userInfo.username);
  data.append("role", userInfo?.role != null ? userInfo.role : "user");
  data.append("email", userInfo.email);
  data.append("password", userInfo.password);
  data.append("phoneNumber", userInfo.phoneNumber);
  data.append("gender", userInfo.gender);
  data.append("dateOfBirth", userInfo.dateOfBirth);
  data.append("countryCode", "+356");
  data.append("address", userInfo.address);
  data.append("image", {
    name: `image-${userInfo.name}.${getExtension(userInfo.image[0])}`,
    type: getImageType(userInfo.image[0]),
    uri: userInfo.image[0],
  });
  return client.post("/users", data);
};

const forgotPassword = (phoneNumber) =>
  client.post("/users/forgetPassword", { phoneNumber: phoneNumber });

const OTBCodeVerification = (OTBCode) => client.post("/users", OTBCode);

export default { login, register, forgotPassword, OTBCodeVerification };
