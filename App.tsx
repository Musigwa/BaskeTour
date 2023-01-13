import { setupListeners } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { persistor, store } from './store';
import { AppDarkTheme, AppDefaultTheme } from './styles/theme';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? AppDarkTheme : AppDefaultTheme;

  useEffect(() => {
    const storeListener = setupListeners(store.dispatch);
    return storeListener;
  }, []);

  return isLoadingComplete ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme.colors}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  ) : (
    <ActivityIndicator size={24} color={theme.colors.primary} />
  );
}
