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
 *
 *
 * @author Musigwa Pacifique
 * @param {(string | number | Date)} date
 * @param {*} callback
 */
const countDownTimer = (date: string | number | Date, callback) => {
  // Set the date we're counting down to
  const countDownDate = new Date(date).getTime();
  // Update the count down every 1 second
  const x = setInterval(() => {
    // Get today's date and time
    const now = new Date().getTime();
    // Find the distance between now and the count down date
    const distance = countDownDate - now;
    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // If the count down is over, return false
    if (distance < 0) {
      clearInterval(x);
      return callback(Array(4).fill(0));
    }
    // Return an array of entities otherwise.
    callback([days, hours, minutes, seconds]);
  }, 1000);
};
