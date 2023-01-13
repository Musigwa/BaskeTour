import React from 'react';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';

import { useAppSelector } from '../../../hooks/useStore';
import { Paragraph, View } from '../../../styles/styled-elements';
import Button from '../../../components/common/Buttons';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '../../../components/common/Container';

const ShareGroupScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const { newGroup } = useAppSelector(state => state.groups);

  const handleCopy = async () => {
    const link = `${newGroup?.slug}${newGroup?.id}`;
    await Clipboard.setStringAsync(link);
    Alert.alert('Group link has been copied');
    navigation.navigate('Tabs');
  };
  return (
    <Container style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Title>Share Group</Title>
      <Paragraph mb={72}>Link to share: {`${newGroup?.slug}/${newGroup?.id}`}</Paragraph>
      <Button text='Copy & Proceed' onPress={handleCopy} />
    </Container>
  );
};

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 66px;
`;

export default ShareGroupScreen;
