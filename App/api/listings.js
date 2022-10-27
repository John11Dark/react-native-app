import client from "./client";

import { getExtension, getImageType } from "../utils";

const endpoint = "/listings";

// functions
const addListing = (listing, onUploadProgress) => {
  const data = new FormData();

  // ? * --> all Address data
  const address = {
    streetLineOne: listing.streetLineOne,
    streetLineTwo: listing.streetLineTwo,
    locality: listing.locality.value,
    location: listing.location,
  };

  data.append("user", JSON.stringify(listing.user));
  data.append("site", listing.site);
  data.append("clientFirstName", listing.clientFirstName);
  data.append("clientLastName", listing.clientLastName);
  data.append("countryCode", listing.countryCode);
  data.append("clientPhoneNumber", listing.clientPhoneNumber);
  data.append("email", listing.email);
  data.append("initialDate", listing.initialDate);
  data.append("address", JSON.stringify(address));
  data.append("status", JSON.stringify(listing.status));

  // ? * --> Check boxes
  data.append("newPool", JSON.stringify(listing.newPool));
  data.append("quotationType", JSON.stringify(listing.quotationType));
  data.append("indoor", JSON.stringify(listing.indoor));
  data.append("poolSteps", JSON.stringify(listing.poolSteps));
  data.append("poolType", JSON.stringify(listing.poolType));
  data.append("whiteGoodsOnly", JSON.stringify(listing.whiteGoodsOnly));
  data.append("extraLights", JSON.stringify(listing.extraLights));
  data.append("extra", JSON.stringify(listing.extra));

  // ? *-> Pickers
  data.append("projectType", JSON.stringify(listing.projectType));
  data.append("poolLocation", JSON.stringify(listing.poolLocation));
  data.append("tileType", JSON.stringify(listing.tileType));

  // ? * --> coping permeates
  data.append("poolPerimeter", listing.poolPerimeter);
  data.append("copingPerimeter", listing.copingPerimeter);

  // ? *--> pool parameters
  data.append("poolLength", listing.poolLength);
  data.append("poolWidth", listing.poolWidth);
  data.append("poolDepthEnd", listing.poolDepthEnd);
  data.append("poolDepthStart", listing.poolDepthStart);
  data.append("poolVolume", listing.poolVolume);

  if (listing.newPool) {
    data.append("optionOne", JSON.stringify(listing.optionOne));
    data.append("optionTwo", JSON.stringify(listing.optionTwo));
    data.append("optionThree", JSON.stringify(listing.optionThree));
  }

  // !  *--> balance tank Parameters only if overflow pool if it is not set it will be undefined

  data.append("poolLeaking", listing.poolLeaking);
  data.append("balanceLength", listing.balanceLength);
  data.append("balanceTankWidth", listing.balanceTankWidth);
  data.append("balanceTankDepth", listing.balanceTankDepth);
  data.append("balanceTankVolume", listing.balanceTankVolume);

  // ! *--> options if it is not Selected it will be set to undefined
  data.append("extraOptions", listing.extraOptions);
  data.append("numberOfWallInlets", listing.numberOfWallInlets);
  data.append("numberOfSkimmers", listing.numberOfSkimmers);
  data.append("numberOfSumps", listing.numberOfSumps);
  data.append("numberOfLights", listing.numberOfLights);
  data.append("spaJets", listing.spaJets);
  data.append("counterCurrent", listing.counterCurrent);
  data.append("vacuumPoints", listing.vacuumPoints);
  data.append("description", listing.description);
  data.append("finalPrice", listing.finalPrice);
  data.append("selectedPackage", listing.selectedPackage);

  data.append("options", JSON.stringify(listing.options));

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: `image-${index}.${getExtension(image)}`,
      type: getImageType(image),
      uri: image,
    })
  );

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
