import React from 'react';
import { ActivityIndicator, StyleSheet, useWindowDimensions } from 'react-native';
import { Modal, Portal, useTheme } from 'react-native-paper';

import BasketBallIcon from '../../assets/svgs/BasketBallIcon';
import { H4 } from '../../styles/styled-elements';

type IProps = { show: boolean; hasBackdrop?: boolean; text?: string; showBall?: boolean };

const Loading = ({ show, showBall = true, text }: IProps) => {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  return (
    <Portal>
      <Modal contentContainerStyle={[styles.container, { width, height }]} visible={show}>
        {showBall ? <BasketBallIcon /> : null}
        <ActivityIndicator size='large' color={colors.primary} />
        {text ? <H4>{text}</H4> : null}
      </Modal>
    </Portal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', columnGap: 200 },
});
