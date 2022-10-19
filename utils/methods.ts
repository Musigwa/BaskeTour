import { Platform } from "react-native";

export const createFormData = (photo: { [x: string]: string }, body = {}) => {
  const data = new FormData();

  data.append("profilePic", {
    name: 'profilePhoto.jpg',
    type: `image/*`,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};
