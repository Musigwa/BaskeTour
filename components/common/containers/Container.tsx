import React, { FC, PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container: FC<PropsWithChildren<{ style?: ViewStyle }>> = ({ children, style }) => {
  return <View style={[{ flex: 1 }, style]}>{children}</View>;
};

export default Container;
