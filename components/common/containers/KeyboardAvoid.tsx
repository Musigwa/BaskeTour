import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAvoid: FC<
  PropsWithChildren<{ children: ReactNode; style?: ViewStyle; contentContainerStyle?: ViewStyle }>
> = ({ children, style, contentContainerStyle }) => {
  return (
    <KeyboardAwareScrollView
      style={[{ width: '100%' }, style]}
      contentInsetAdjustmentBehavior='always'
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoid;
