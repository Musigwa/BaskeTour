import { StatusBar } from 'expo-status-bar';
import React, { FC, PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container: FC<PropsWithChildren<{ style?: ViewStyle }>> = ({ children, style }) => {
  return (
    <View style={[style, { flex: 1 }]}>
      <StatusBar />
      {children}
    </View>
  );
};

export default Container;
