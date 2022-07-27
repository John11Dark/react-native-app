import { create } from "apisauce";
import { envKeys, settings } from "../config";

export const pixelsUrl = settings.pixelsUrl;
// const pixelsClient = create({ pixelsUrl });

// pixelsClient.addAsyncRequestTransform(async (request) => {
//   request.headers[envKeys.pixelKey];
// });

// const getMethod = pixelsClient.get;

// pixelsClient.get = async (url, params, axiosConfig) => {
//   const response = await getMethod(url, params, axiosConfig);
//   if (!response.ok) return { ok: false, data: response };

//   return response;
// };

const pixelsClient = async (url) => {
  const data = await fetch(`${pixelsUrl}${url}`, {
    headers: {
      authorization: envKeys.pixelKey,
    },
  });

  const { photos } = await data.json();
  return photos;
};
export default pixelsClient;
