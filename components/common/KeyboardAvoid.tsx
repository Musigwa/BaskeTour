import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAvoid: FC<PropsWithChildren<{ children: ReactNode; style?: ViewStyle }>> = ({
  children,
  style,
}) => {
  return (
    <KeyboardAwareScrollView
      style={[{ width: '100%' }]}
      contentInsetAdjustmentBehavior='always'
      contentContainerStyle={style}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoid;
