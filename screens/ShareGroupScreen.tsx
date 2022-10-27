import React from 'react';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppSelector } from '../hooks/useStore';
import { Paragraph, View } from '../styles/styled-elements';
import Button from '../components/common/Buttons';
import Link from '../components/common/Link';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ShareGroupScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const { newGroup } = useAppSelector(state => state.groups);

  const handleCopy = async () => {
    const link = `${newGroup?.slug}${newGroup?.id}`;
    await Clipboard.setStringAsync(link);
    Alert.alert('Group link has been copied');
  };
  return (
    <Wrapper pt={insets.top} pb={insets.bottom}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        containerStyle={{
          position: 'absolute',
          left: 16,
          top: insets.top,
          zIndex: 32,
        }}
      >
        <Feather name='chevron-left' size={32} color='black' />
      </TouchableOpacity>
      <Container>
        <Title>Share Group</Title>
        <Paragraph mb={72}>Link to share: {`${newGroup?.slug}/${newGroup?.id}`}</Paragraph>

        <Button text='Copy Link' onPress={handleCopy} />
        <Link text='Start Playing' screen='Root' />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  flex: 1;
  background-color: white;
  flex-directon: column;
  align-items: stretch;
`;
const Container = styled(View)`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 66px;
`;

const Start = styled(Paragraph)`
  color: ${props => props.theme.primary};
  margin-top: 55px;
  font-size: 18px;
`;

export default ShareGroupScreen;
