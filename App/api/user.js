import client from "./client";
import { getExtension, getImageType } from "../utils";
const endPoint = "/users";

// get all users
const getAll = () => client.get(endPoint);

// get single user by their id
const getUserById = (id) => client.get(`${endPoint}/${id}`);

// delete request
const deleteAccount = (id) => client.delete(`user/${id}`);

// update request
const updateUser = (userInfo, onUploadProgress, image = false) => {
  if (image) {
    const image = new FormData();
    image.append("image", {
      name: `image-${userInfo.name}.${getExtension(userInfo.image[0])}`,
      type: getImageType(userInfo.image[0]),
      uri: userInfo.image[0],
    });
  }
  const user = {
    email: userInfo.email,
    image: userInfo.image,
    name: userInfo.name,
    username: userInfo.username,
    phoneNumber: userInfo.phoneNumber,
  };

  if (userInfo.role) user.role = userInfo.role;
  if (userInfo.oldPassword && userInfo.newPassword) {
    user.oldPassword = userInfo.oldPassword;
    user.newPassword = userInfo.newPassword;
  }
  return client.patch(`${endPoint}/${userInfo.id}`, user, {
    onUploadProgress: ({ loaded, total }) =>
      onUploadProgress(loaded / (total - 0.01)),
  });
};

export default { deleteAccount, getAll, getUserById, updateUser };
