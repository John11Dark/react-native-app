import client from "./client";
import { getExtension, getImageType } from "../utils";

const login = (email, password) => client.post("/auth", { email, password });

const register = (userInfo, onUploadProgress) => {
  const userData = new FormData();
  userData.append("name", userInfo.name);
  userData.append("flag", "user");
  userData.append("username", userInfo.username);
  userData.append("role", userInfo?.role != null ? userInfo.role : "user");
  userData.append(
    "countryCode",
    userInfo?.countryCode != null ? userInfo.countryCode : "+356"
  );
  userData.append("email", userInfo.email);
  userData.append("password", userInfo.password);
  userData.append("phoneNumber", userInfo.phoneNumber);
  userData.append("gender", userInfo.gender);
  if (userInfo?.dateOfBirth) userData.dateOfBirth = userInfo.dateOfBirth;
  if (userInfo?.address) userData.address = userInfo.address;
  if (userInfo.image)
    userData.image = {
      name: `image-${userInfo.name}.${getExtension(userInfo.image[0])}`,
      type: getImageType(userInfo.image[0]),
      uri: userInfo.image[0],
    };
  return client.post("/users", userData);
};

const forgotPassword = (username) => client.post("/users", username);

export default { login, register, forgotPassword };
