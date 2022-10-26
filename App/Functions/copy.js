import * as ClipBoard from "expo-clipboard";

const toClipboard = async (text) => {
  await ClipBoard.setStringAsync(text);
};

export default {
  toClipboard,
};
