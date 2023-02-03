import React, { FC, PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

const Container: FC<PropsWithChildren<{ style?: ViewStyle }>> = ({ children, style }) => {
  return <View style={[style, { flex: 1 }]}>{children}</View>;
};

export default Container;
