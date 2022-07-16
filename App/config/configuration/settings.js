import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.1.181:9000/api",
    assetsUrl: "http://192.168.1.181:9000/assets/",
  },
  staging: {
    apiUrl: "http://192.168.1.181:9000/api",
    assetsUrl: "http://192.168.1.181:9000/assets/",
  },
  prod: {
    apiUrl: "https://dolphinpoolsltdbackend.herokuapp.com/api",
    assetsUrl: "https://dolphinpoolsltdbackend.herokuapp.com/assets/",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
