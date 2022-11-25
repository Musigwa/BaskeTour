import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components/native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { dark, light } from './styles/theme';
import { ToastBannerProvider, ToastBannerPresenter, Transition } from 'react-native-toast-banner';

import 'react-native-gesture-handler';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return isLoadingComplete ? (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={colorScheme === 'dark' ? dark : light}>
          <SafeAreaProvider>
            <ToastBannerProvider>
              <Navigation colorScheme={colorScheme} />
              <ToastBannerPresenter />
            </ToastBannerProvider>
            <StatusBar />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  ) : null;
}
