import client from "./client";

import { getExtension, getImageType } from "../utils";

const endpoint = "/listings";

// functions
const addListing = (listing, onUploadProgress) => {
  const user = {
    name: listing.user.name,
    id: listing.user.userId,
    image: listing.user.images[0].url,
  };
  const data = new FormData();
  data.append("title", listing.title);
  data.append("email", listing.email);
  data.append("countryCode", listing.countryCode);
  data.append("clientPhoneNumber", listing.clientPhoneNumber);
  data.append("clientFirstName", listing.clientFirstName);
  data.append("clientLastName", listing.clientLastName);
  data.append("description", listing.description);
  data.append("initialDate", listing.initialDate);
  data.append("indoor", listing.indoor);
  data.append("mosaicOrTile", listing.mosaicOrTile);
  data.append("poolSteps", listing.poolSteps);
  data.append("poolLeaking", listing.poolLeaking);
  // options
  data.append("numberOfWallInlets", listing.numberOfWallInlets);
  data.append("numberOfSkimmers", listing.numberOfSkimmers);
  data.append("numberOfSumps", listing.numberOfSumps);
  data.append("numberOfLights", listing.numberOfLights);
  data.append("spaJets", listing.spaJets);
  data.append("counterCurrent", listing.counterCurrent);
  data.append("vacuumPoints", listing.vacuumPoints);
  // pickers
  data.append("projectType", listing.projectType);
  data.append("poolType_ID", listing.poolType);
  data.append("poolLocation_ID", listing.poolLocation);
  data.append("indoor", listing.indoor);
  data.append("poolLeaking", listing.poolLeaking);
  data.append("poolSteps", listing.poolSteps);
  // pool parameters
  data.append("poolLength", listing.poolLength);
  data.append("poolWidth", listing.poolWidth);
  data.append("poolDepthEnd", listing.poolDepthEnd);
  data.append("poolDepthStart", listing.poolDepthStart);
  data.append("poolPerimeter", listing.poolPerimeter);
  data.append("copingPerimeter", listing.copingPerimeter);
  data.append("balanceLength", listing.balanceLength);
  data.append("poolVolume", listing.poolVolume);
  data.append("balanceTankWidth", listing.balanceTankWidth);
  data.append("balanceTankDepth", listing.balanceTankDepth);
  data.append("balanceTankPipe", listing.balanceTankPipe);
  data.append("poolVolume", listing.poolVolume);
  data.append("clientAddressStreetOne", listing.clientAddressStreetOne);
  data.append("clientAddressLocality", listing.clientAddressLocality);
  data.append("location", JSON.stringify(listing.location));
  data.append("user", JSON.stringify(user));

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: `image-${index}.${getExtension(image)}`,
      type: getImageType(image),
      uri: image,
    })
  );
  if (listing.clientAddressStreetTwo)
    data.append("clientAddressStreetTwo", listing.clientAddressStreetTwo);
  console.log(listing);
  return client.post(endpoint, data, {
    onUploadProgress: ({ loaded, total }) => onUploadProgress(loaded / total),
  });
};

const archiveList = async (id) => {
  return await client.patch(`${endpoint}/archive/${id}`, { id: id });
};

const deleteList = async (id) => {
  return await client.delete(`${endpoint}/${id}`);
};

const getArchivedListings = () => client.get(`${endpoint}/archived`);

const getRecycleBinListings = () => client.get(`${endpoint}/recycleBin`);

const getListings = () => client.get(endpoint);

const getUserListings = (id) => client.get(`/user/${id}${endpoint}`);

const restoreList = async (id, multiply = false) => {
  return await client.patch(`${endpoint}/recycleBin/${id}`, { id: id });
};
const unarchive = (id) =>
  client.patch(`${endpoint}/unarchive/${id}`, { id: id });

const updateListings = async (id, itemsToUpdate) => {
  const result = await client.patch(endpoint + "/" + id, itemsToUpdate);
  return result;
};

export default {
  addListing,
  archiveList,
  deleteList,
  getArchivedListings,
  getRecycleBinListings,
  getListings,
  getUserListings,
  restoreList,
  unarchive,
  updateListings,
};
