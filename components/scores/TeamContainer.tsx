import React from 'react';
import { Image } from 'react-native';
import { H5, Horizontal } from '../../styles/styled-elements';

const TeamContainer = ({ team }: { team: any }) => {
  return (
    <Horizontal>
      <Horizontal style={{ justifyContent: 'flex-start' }}>
        <Image source={{ uri: team.logo }} style={{ width: 25, height: 25, marginRight: 15 }} />
        <H5 style={{ color: '#CBB7B7' }}>
          {`${team.ranking}\u0020`}
          <H5 style={{ color: '#000' }}>{team.name}</H5>
        </H5>
      </Horizontal>
      <H5>{team.record}</H5>
    </Horizontal>
  );
};

export default TeamContainer;
