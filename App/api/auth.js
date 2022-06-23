import client from "./client";
import { getExtension, getImageType } from "../utils";

const login = (email, password) => client.post("/auth", { email, password });

const register = (userInfo) => {
  const userData = new FormData();
  userData.append("email", userInfo.email);
  userData.append("name", userInfo.name);
  userData.append("password", userInfo.password);
  userData.append("phoneNumber", userInfo.phoneNumber);
  userData.append("userName", userInfo.userName);
  userData.append("role", "user");
  userData.append("images", {
    name: `image-${userInfo.name}.${getExtension(userInfo.images[0])}`,
    type: getImageType(userInfo.images[0]),
    uri: userInfo.images[0],
  });
  return client.post("/users", userData);
};

const forgotPassword = (userName) => client.post("/users", userName);

export default { login, register, forgotPassword };
