import { Platform } from "react-native";

export const createFormData = (photo: { [x: string]: string }, body = {}) => {
  const data = new FormData();

  data.append("profilePic", {
    name: "profilePhoto.jpg",
    type: `image/*`,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export /**
 * Calculates the remaining [days, hours, minutes, seconds] to the given date/time.
 * @author Musigwa Pacifique
 * @param {(string | number | Date)} date
 * @param {*} callback
 * @returns [days, hours, minutes, seconds]
 */
const countDownTimer = (date: Date | string | number, callback) => {
  const x = setInterval(() => {
    const mills = new Date(date).getTime() - new Date().getTime();
    if (mills < 0) {
      clearInterval(x);
      return callback(Array(4).fill(0));
    }
    const days = Math.floor(mills / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (mills % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((mills % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((mills % (1000 * 60)) / 1000);
    return callback([days, hours, minutes, seconds]);
  }, 1000);
};
