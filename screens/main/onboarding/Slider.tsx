import React, { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Button from '../../../components/common/Buttons';
import IndicatorHeader from '../../../components/Indicator';
import PhotoHolder from '../../../components/PhotoHolder';
import { useAppDispatch } from '../../../hooks/useStore';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Paragraph, View } from '../../../styles/styled-elements';
import { AuthScreenProps } from '../../../types';
import { completedOnboarding } from '../../../store/slices/authSlice';

function OnboardingScreen({ navigation }: AuthScreenProps<'Onboarding'>) {
  const [currentStep, setCurrentStep] = useState(0);

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const handleGetStarted = () => {
    if (currentStep < 5) setCurrentStep(prevState => prevState + 1);
    else {
      dispatch(completedOnboarding(true));
      handleSkip();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prevState => prevState - 1);
  };

  const handleSkip = () => {
    dispatch(completedOnboarding(true));
  };

  const steps = [
    {
      title: 'Make Your Picks',
      subText:
        'Pick a few teams to advance each round, but you can never pick the same team twice!',
    },
    {
      title: 'It’s Survivor!',
      subText: 'Every incorrect pick costs you a life. 3 losses and you’re out. ',
    },
    {
      title: 'Earn Points for Upsets',
      subText:
        'Every correct pick earns you points. If your 12 seeded pick beats the 5 seed you earn 12 points!',
    },
    {
      title: 'Stay Alive & Win',
      subText: 'The last player standing with the most points wins!',
    },
    {
      title: 'Group Management',
      subText: 'Create a private pool with your friends and family.',
    },
    {
      title: 'Group Chat',
      subText: 'Talk trash within your group all tourney long directly in the app.',
    },
  ];

  const currentDetails = useMemo(() => {
    return steps[currentStep];
  }, [currentStep]);

  return (
    <Container pt={insets.top} pb={insets.bottom}>
      <IndicatorHeader
        showBackIcon={true}
        count={6}
        currentStep={currentStep + 1}
        handleBackPress={handleBack}
      />
      <View w-100 flex={1}>
        <View items-center w-100 mt={40} mb={26}>
          <Title>How to Play</Title>
        </View>

        <View w-100 items-center>
          <PhotoHolder />
        </View>

        <View mt={47} w-100 items-center>
          <Title>{currentDetails.title}</Title>
          <SubText>{currentDetails.subText}</SubText>
        </View>

        <View mt={50} w-100 items-center>
          <Button text='Next' onPress={handleGetStarted} />
          <TouchableOpacity onPress={handleSkip}>
            <Skip mt={39}>Skip for now</Skip>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
`;

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: 700;
`;

const SubText = styled(Paragraph)`
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
`;

const Skip = styled(Paragraph)`
  font-size: 18px;
  color: ${props => props.theme.primary};
`;

export default OnboardingScreen;
