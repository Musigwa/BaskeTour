import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Button from '../../../components/common/Buttons';
import IndicatorHeader from '../../../components/Indicator';
import PhotoHolder from '../../../components/PhotoHolder';
import { useAppDispatch } from '../../../hooks/useStore';

import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { steps } from '../../../constants';
import { completedOnboarding } from '../../../store/slices/auth';
import { H2, H3, Paragraph } from '../../../styles/styled-elements';

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const currentDetails = useMemo(() => {
    return steps[currentStep];
  }, [currentStep]);

  return (
    <SafeAreaView
      style={{
        justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center',
        flex: 1,
      }}
    >
      <IndicatorHeader
        showBackIcon={true}
        count={6}
        currentStep={currentStep + 1}
        handleBackPress={handleBack}
      />
      <H2>How to Play</H2>
      <PhotoHolder />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <H2>{currentDetails.title}</H2>
        <H3 style={{ textTransform: 'none', marginTop: 10 }}>{currentDetails.subText}</H3>
      </View>
      <Button text='Next' onPress={handleGetStarted} containerStyle={{ width: '100%' }} />
      <TouchableOpacity onPress={handleSkip}>
        <Skip>Skip for now</Skip>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const Skip = styled(Paragraph)`
  font-size: 18px;
  color: ${props => props.theme.primary};
`;

export default OnboardingScreen;
