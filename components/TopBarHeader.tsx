import React from 'react';
import { Paragraph, View } from '../styles/styled-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const TopBarHeader = () => {
  const insets = useSafeAreaInsets();
  return <Container pt={insets.top}></Container>;
};

const Container = styled(View)`
  background: white;
`;

export default TopBarHeader;
