import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Horizontal, Paragraph, Separator } from '../../../../styles/styled-elements';

import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import TeamContainer from '../../../../components/scores/TeamContainer';
import { useGetGamesQuery } from '../../../../store/api-queries/tournaments';
import { GAME_STATUS } from '../../../../types';

const ScoresScreen = () => {
  const statuses = {
    upcoming: 'STATUS_SCHEDULED',
    live: 'LIVE',
    complete: 'STATUS_FINAL',
  };

  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState<GAME_STATUS>('STATUS_SCHEDULED');

  const {
    data: { data: games = [] } = {},
    isFetching,
    refetch,
  } = useGetGamesQuery({ status: currentTab }, { refetchOnReconnect: true });

  useEffect(refetch, [currentTab]);

  return (
    <Container>
      <RoundBanner tintColor='red' source={require('../../../../assets/images/roundImage.png')}>
        <InnerBanner>
          <BannerText>Round of 64</BannerText>
        </InnerBanner>
      </RoundBanner>
      <Horizontal>
        {Object.keys(statuses).map((lb, idx) => {
          return (
            <Pressable
              key={idx}
              style={{ padding: 20 }}
              onPress={() => setCurrentTab(statuses[lb])}
            >
              <H3
                style={{
                  textTransform: 'capitalize',
                  fontWeight: currentTab === statuses[lb] ? '700' : '500',
                  color: currentTab === statuses[lb] ? colors.primary : 'black',
                }}
              >
                {lb}
              </H3>
            </Pressable>
          );
        })}
      </Horizontal>
      <Separator size='md' />
      {isFetching ? (
        <ActivityIndicator
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={colors.primary}
          size='large'
        />
      ) : games.length ? (
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
          {games.map(({ teamA, teamB, eventDate }, idx) => {
            return (
              <View key={idx}>
                <Horizontal>
                  <TeamsWrapper
                    style={{
                      flex: 0.76,
                      borderRightWidth: 1.5,
                      borderRightColor: '#e9ebed',
                    }}
                  >
                    {[teamA, teamB].map((team, idx) => (
                      <TeamContainer key={idx} team={team} currentTab={currentTab} />
                    ))}
                  </TeamsWrapper>
                  {currentTab === 'STATUS_FINAL' ? (
                    <H6>Final</H6>
                  ) : (
                    <View>
                      {currentTab === 'LIVE' ? (
                        <H6 style={{ color: colors.primary }}>10:27- 1st</H6>
                      ) : null}
                      <H6>{moment(eventDate).format('ddd, MM/DD')}</H6>
                      <H6>{moment(eventDate).format('LT')}</H6>
                      {/* <H6>TCU -9.5</H6> Flagsmithed for the Nov, 24 - 27th tournament */}
                    </View>
                  )}
                </Horizontal>
                <Separator />
              </View>
            );
          })}
        </ScrollView>
      ) : null}
    </Container>
  );
};

const TeamsWrapper = styled.View`
  padding-right: 20px;
  justify-content: space-evenly;
  min-height: 80px;
  margin: 10px 0px;
`;
const Container = styled(View)`
  flex: 1;
  width: 100%;
`;

const RoundBanner = styled.ImageBackground`
  width: 100%;
  height: 68px;
`;

const InnerBanner = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(79, 20, 115, 0.74);
`;

const H3 = styled(Paragraph)`
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.165px;
  text-align: center;
`;

const H6 = styled(Paragraph)`
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.7799999713897705px;
`;

const BannerText = styled(H3)`
  color: white;
`;

export default ScoresScreen;
