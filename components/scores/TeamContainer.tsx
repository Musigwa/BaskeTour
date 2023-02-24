import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Iteam } from '../../interfaces';
import { H6, Horizontal } from '../../styles/styled-elements';
import { GAME_STATUS } from '../../types';

type TeamProps = {
  team: Iteam;
  currentTab: GAME_STATUS;
};

const TeamContainer = ({ team, currentTab }: TeamProps) => {
  const { colors } = useTheme();
  const [first, last] = team.name;
  const label = `${first?.slice(0, 1)}${last ? last?.slice(0, 1) : first?.slice(1, 2)}`;
  return (
    <Horizontal>
      <Horizontal style={{ justifyContent: 'flex-start' }}>
        {team.logo ? (
          <Image
            source={{ uri: team.logo }}
            style={{ width: 30, height: 30, marginRight: 10, borderRadius: 5 }}
            resizeMode='contain'
          />
        ) : (
          <Avatar.Text
            labelStyle={{ fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold' }}
            label={label}
            style={{ marginRight: 10, borderRadius: 5, backgroundColor: 'white' }}
            size={30}
          />
        )}
        <H6 style={{ color: '#CBB7B7' }}>
          {`${team?.ranking}\u0020`}
          <H6 style={{ color: '#000' }}>{team.name}</H6>
        </H6>
      </Horizontal>
      <H6 style={{ color: team.isWinner ? colors.primary : 'black' }}>
        {currentTab === 'STATUS_SCHEDULED' ? team.record : team.score}
      </H6>
    </Horizontal>
  );
};

export default TeamContainer;
