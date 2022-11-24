import { DefaultTheme } from 'styled-components';

const common = {
  borderRadius: 100,
  containerPadding: 16,
  lightGray: '#F0F0F0',
  danger: '#ff6347',
};

export const dark: DefaultTheme = {
  primary: '#FF4A00',
  primaryHighlight: '#F95435',
  secondary: '#B7B6B6',
  title: '#000',
  text: '#000',
  background: '#fff',
  danger: '#ff6347',
  accentBlue: '#4833B5',
  accentPurple: '#9C49CF',
  common,
};

export const light: DefaultTheme = {
  primary: '#FF755B',
  primaryHighlight: '#F95435',
  secondary: '#B7B6B6',
  title: '#000',
  text: '#000',
  background: '#fff',
  danger: '#ff6347',
  accentBlue: '#4833B5',
  accentPurple: '#9C49CF',
  common,
};
