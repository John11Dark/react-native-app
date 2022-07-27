import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.1.181:9000/api",
    assetsUrl: "http://192.168.1.181:9000/assets/",
    pixelsUrl: "https://api.pexels.com/v1/search?query=",
  },
  staging: {
    apiUrl: "http://192.168.1.181:9000/api",
    assetsUrl: "http://192.168.1.181:9000/assets/",
    pixelsUrl: "https://api.pexels.com/v1/search?query=",
  },
  prod: {
    apiUrl: "https://dolphinpoolsltdbackend.herokuapp.com/api",
    assetsUrl: "https://dolphinpoolsltdbackend.herokuapp.com/assets/",
    pixelsUrl: "https://api.pexels.com/v1/search?query=",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
