import { Platform } from 'react-native';

export const createFormData = (photo: { [x: string]: string }, body = {}) => {
  const data = new FormData();

  data.append('profilePic', {
    name: 'profilePhoto.jpg',
    type: `image/*`,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach(key => {
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
    const hours = Math.floor((mills % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((mills % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((mills % (1000 * 60)) / 1000);
    return callback([days, hours, minutes, seconds]);
  }, 1000);
};

/**
 * Look up the active tournament's rounds
 * @author Musigwa Pacifique
 * @param {*} tournament
 * @return {*} activeRound
 */
export const getActiveRound = tournament => {
  if (tournament?.rounds && tournament.rounds.length) {
    const { rounds } = tournament;
    const uncompleted = rounds
      .filter(r => new Date(r.endDate) > new Date())
      .sort((a, b) => +(a.startDate < b.startDate));
    const [activeRound] = uncompleted;
    return activeRound;
  }
  return {};
};

/**
 * This function compares two objects and returns
 * items that are only present in the second object.
 * @author Musigwa Pacifique
 * @param {*} o1
 * @param {*} o2
 * @return {*}
 */
export const objDiff = (o1, o2) =>
  Object.keys(o2).reduce(
    (diff, key) => (o1[key] === o2[key] ? diff : { ...diff, [key]: o2[key] }),
    {}
  );
