import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const AppDarkTheme: typeof DefaultTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF4A00',
    text: '#000',
    background: '#fff',
    notification: '#ff6347',
    pink: 'rgba(156, 73, 207, 0.08)',
    disabled: 'rgba(214, 212, 212, 1)',
    gray: 'rgba(144, 160, 175, 1)',
    violet: 'rgba(167, 97, 255, 1)',
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
    pink: 'rgba(156, 73, 207, 0.08)',
    disabled: 'rgba(214, 212, 212, 1)',
    gray: 'rgba(144, 160, 175, 1)',
    violet: 'rgba(167, 97, 255, 1)',
  },
};
