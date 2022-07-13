import client from "./client";
import { getExtension, getImageType } from "../utils";

const login = (email, password) => client.post("/auth", { email, password });

const register = (userInfo, onUploadProgress) => {
  const userData = new FormData();
  userData.append("email", userInfo.email);
  userData.append("name", userInfo.name);
  userData.append("password", userInfo.password);
  userData.append("phoneNumber", userInfo.phoneNumber);
  userData.append("username", userInfo.username);
  userData.append("role", "user");
  userData.append("image", {
    name: `image-${userInfo.name}.${getExtension(userInfo.image[0])}`,
    type: getImageType(userInfo.image[0]),
    uri: userInfo.image[0],
  });
  if (userInfo.role) userData.role = userInfo.role;
  return client.post("/users", userData, {
    onUploadProgress: ({ loaded, total }) => onUploadProgress(loaded / total),
  });
};

const forgotPassword = (username) => client.post("/users", username);

export default { login, register, forgotPassword };
