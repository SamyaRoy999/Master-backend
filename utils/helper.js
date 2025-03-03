import { supportedMimes } from "../config/fileSystem.js";
import { v4 as uuidv4 } from "uuid";
export const imageValidation = (size, mine) => {
  if (bitesTomb(size) > 2) {
    return "image size must be less then 2 mb";
  } else if (!supportedMimes.includes(mine)) {
    return "image must be type of png jpg jpeg svg gif webp";
  }
  return null;
};
export const bitesTomb = (bytes) => {
  return bytes / (1024 * 1024);
};

export const genaretRenNum = () => {
  return uuidv4();
};
