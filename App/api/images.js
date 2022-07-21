import client from "./client";
import { getExtension, getImageType } from "../utils";

const endpoint = "images";

const getImages = () => client.get(endpoint);
const deleteImage = (id) => client.delete(endpoint + id);

const postImages = async (images) => {
  const imagesData = new FormData();
  images.forEach((image, index) => {
    imagesData.append("images", {
      name: `image-${index}.${getExtension(image)}`,
      type: getImageType(image),
      uri: image,
    });
  });

  const res = await client.post(endpoint, imagesData);
  return res;
};
export default {
  getImages,
  postImages,
  deleteImage,
};
