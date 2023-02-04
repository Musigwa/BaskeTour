import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { View } from '../styles/styled-elements';

interface IProps {
  count: number;
  currentStep: number;
  showBackIcon?: boolean;
  handleBackPress?: () => void;
}

const Indicator = ({
  count = 2,
  currentStep = 1,
  showBackIcon = false,
  handleBackPress = () => {},
}: IProps) => {
  const stepArray = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <Wrapper>
      {showBackIcon && (
        <Back onPress={handleBackPress}>
          <MaterialIcons name='arrow-back-ios' size={18} color='black' />
        </Back>
      )}

      <View flex-row style={{ alignSelf: 'center' }}>
        {stepArray.map((step, idx) => (
          <IndicatorItem
            key={idx}
            mr={step < stepArray.length ? 10 : 0}
            active={step <= currentStep}
          />
        ))}
      </View>
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const IndicatorItem = styled(View)<{ active: boolean }>`
  width: 35px;
  height: 4px;
  background-color: ${props => (props.active ? '#4F1473' : '#C4C4C4')};
`;

const Back = styled.Pressable`
  position: absolute;
  left: 0;
  /* margin-right: auto; */
`;

export default Indicator;
