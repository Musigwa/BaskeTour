import React from 'react';
import styled from 'styled-components/native';
import ImageIcon from '../assets/svgs/ImageIcon';

import { View } from '../styles/styled-elements';

const PhotoHolder = () => {
  return (
    <Wrapper>
      <ImageIcon />
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 235px;
  border-radius: 24px;
  background-color: #e5e3ee;
`;

export default PhotoHolder;
