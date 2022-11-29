import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const AppDarkTheme: typeof DefaultTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF4A00',
    text: '#000',
    background: '#fff',
    notification: '#ff6347',
  },
};

export const AppDefaultTheme: typeof DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF755B',
    text: '#000',
    background: '#fff',
    notification: '#ff6347',
  },
};
