import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { TCUrl } from '../constants';

type ColorType =
  | 'solo'
  | 'tint'
  | 'shade'
  | 'soloTint'
  | 'soloShade'
  | 'tintShade'
  | 'soloTintShade';

type ColorFormat = 'hex' | 'rgba';
type ColorGenArgs = {
  format?: ColorFormat;
  type?: ColorType;
  opacity?: number;
  contrast?: 'low' | 'high';
};

export const createFormData = (
  photo: { [x: string]: string },
  body = {},
  propName = 'profilePic'
) => {
  const data = new FormData();
  const name = photo?.uri?.split('/').pop() ?? 'profilePhoto.jpg';
  const uri = Platform.select({ ios: photo?.uri?.replace('file://', ''), android: photo.uri });
  data.append(propName, { name, type: `image/*`, uri });
  for (let property in body) data.append(property, body[property]);
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

/**
 * This function slices a string longer than (n) text and padd the ellipsize dots
 * @author Musigwa Pacifique
 * @param {string} text
 * @param {number} n
 * @returns {string}
 */
export const ellipsizeText = (text: string = '', n: number) =>
  text.length > n ? text.slice(0, n - 1) + '\u2026' : text;

/**
 * Helps generate a usable format's random color
 * @author Musigwa Pacifique
 * @param {string} [format='hex']
 * @param {string} [type='solo']
 * @param {number} [opacity=1]
 * @param {'high'|'low'|undefined}
 * @returns Either an object representation of the generated color and its matching onColor or
 * an array of objects representation: Generated color, its corresponding
 * tint and shade colors as well as the matching contentColor => 'onColor' for each depending on the passed type value.
 * @example 1. genColor(); ==> '#68f538'
 * @example 2. genColor({ format: 'rgba' }); ==> 'rgba(159, 112, 193, 1)'
 * @example 3. genColor({ format: 'rgba', opacity: 0.8 }); ==> 'rgba(159, 112, 193, 0.8)'
 * @example 4. genColor({ format: 'rgba', opacity: 0.8, type: 'solo' }); ==> 'rgba(156, 121, 83, 0.5)'
 * @example 5. genColor({ format: 'rgba', opacity: 0.8, type: 'shade' }); ==> 'rgba(70, 92, 30, 0.8)'
 * @example 6. genColor({ format: 'rgba', opacity: 0.8, type: 'tint' }); ==> 'rgba(70, 92, 30, 0.8)'
 * @example 7. genColor({ format: 'rgba', opacity: 0.8, type: 'soloTint' }); ==> ["rgba(90, 205, 38, 0.8)", "rgba(156, 225, 125, 0.8)"]
 * @example 8. genColor({ format: 'rgba', opacity: 0.8, type: 'soloShade' }); ==> ["rgba(80, 226, 166, 0.8)", "rgba(32, 90, 66, 0.8)"]
 * @example 9. genColor({ format: 'rgba', opacity: 0.8, type: 'all' }); ==> ["rgba(115, 93, 80, 0.8)", "rgba(171, 158, 150, 0.8)", "rgba(46, 37, 32, 0.8)"]
 */
export const genColor = (args?: ColorGenArgs) => {
  const { format = 'hex', type = 'solo', opacity = 1, contrast } = args ?? {};
  const genNumber = (upper = 256) => Math.floor(Math.random() * upper);
  const calcTint = (value, index = 0.2) => Math.round(value + (255 - value) * index);
  const calcShade = (value, index = 0.7) => Math.round(value * index);

  const toHEX = ([red = 255, green = 255, blue = 255]: number[]) =>
    `#${((red << 16) + (green << 8) + blue).toString(16).padStart(6, '0')}`;
  const toRGBA = ([red = 255, green = 255, blue = 255]: number[], opacity: number = 1) =>
    `rgba(${red}, ${green}, ${blue}, ${opacity})`;

  const red = genNumber(); // 0 - 255
  const green = genNumber(); // 0 - 255
  const blue = genNumber(); // 0 - 255

  const solo = [red, green, blue];
  const tint = [calcTint(red), calcTint(green), calcTint(blue)];
  const shade = [calcShade(red), calcShade(green), calcShade(blue)];

  const formatFn = (array: number[]) => (format === 'rgba' ? toRGBA(array, opacity) : toHEX(array));

  const color = formatFn(solo);
  const tintColor = formatFn(tint);
  const shadeColor = formatFn(shade);

  switch (type) {
    case 'solo':
      return color;
    case 'tint':
      return tintColor;
    case 'shade':
      return shadeColor;
    case 'soloTint':
      return [color, tintColor];
    case 'soloShade':
      return [color, shadeColor];
    case 'tintShade':
      return [tintColor, shadeColor];
    case 'soloTintShade':
      return [color, tintColor, shadeColor];
    default:
      return color;
  }
};

export const openBrowser = async (url = TCUrl) => {
  await WebBrowser.openBrowserAsync(url);
};
