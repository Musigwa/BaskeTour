import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider, configureFonts } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';
import Loading from './components/common/Loading';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { persistor, store } from './store';
import { AppDefaultTheme } from './styles/theme';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const theme = AppDefaultTheme;
  const configuredFontTheme = {
    ...theme,
    fonts: configureFonts({ config: { fontFamily: 'Poppins_500Medium' } }),
  };

  useEffect(() => {
    const storeListener = setupListeners(store.dispatch);
    return storeListener;
  }, []);

  return isLoadingComplete ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={configuredFontTheme}>
          <ThemeProvider theme={configuredFontTheme.colors}>
            <SafeAreaProvider>
              <StatusBar style='dark' />
              <Navigation colorScheme={colorScheme} />
            </SafeAreaProvider>
          </ThemeProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  ) : (
    <PaperProvider theme={configuredFontTheme}>
      <Loading show={!isLoadingComplete} />
    </PaperProvider>
  );
}
