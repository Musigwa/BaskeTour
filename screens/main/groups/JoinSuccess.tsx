import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ConsensusIcon from '../../../assets/svgs/Consensus';
import Button from '../../../components/common/Buttons';
import { Paragraph, View } from '../../../styles/styled-elements';
import Container from '../../../components/common/containers/Container';

const JoinGroupSuccessScreen = ({ navigation, route }) => {
  const {
    params: { group },
  } = route;

  const gotItButtonClickHandler = () => {
    navigation.navigate('Tabs');
  };

  return (
    <Container>
      <View flex={1} w-100 flex-row items-center>
        <InfoContainer items-center w-100>
          <ConsensusIcon />
          <CTAText mt={63}>
            You Successfully Joined The <Highlight>{group?.groupName} Group</Highlight>
          </CTAText>
        </InfoContainer>
      </View>
      <View w-100 mb={40} style={{ alignItems: 'center' }}>
        <Button bottom-0 onPress={gotItButtonClickHandler} text='Start Play' />
      </View>
    </Container>
  );
};

const InfoContainer = styled(View)`
  padding: 10px;
`;

export const joinGroupSuccessScreenOptions = ({}) => ({
  headerShown: false,
});

export const CTAText = styled(Paragraph)`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  padding: 0 20px;
  line-height: 32px;
`;

export const Highlight = styled(Text)`
  color: #9c49cf;
`;
export default JoinGroupSuccessScreen;
