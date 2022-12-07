import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components/native';
import { H4, Horizontal, Paragraph, Separator } from '../../../../styles/styled-elements';

import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import moment from 'moment';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import TopTab from '../../../../components/common/TopTab';
import TeamContainer from '../../../../components/scores/TeamContainer';
import { useGetGamesQuery } from '../../../../store/api-queries/tournaments';
import { GAME_STATUS } from '../../../../types';
import { useToast } from 'react-native-toast-notifications';

const ScoresScreen = ({ route }) => {
  const statuses = {
    upcoming: 'STATUS_SCHEDULED',
    live: 'STATUS_IN_PROGRESS',
    complete: 'STATUS_FINAL',
  };

  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState<GAME_STATUS>('STATUS_SCHEDULED');
  const { params } = route;
  const myScores = !!params?.scoreType?.toLowerCase().includes('my score');
  const options = currentTab === 'STATUS_IN_PROGRESS' ? { pollingInterval: 5000 } : undefined;
  const response = useGetGamesQuery({ status: currentTab, myScores }, options);
  const { data = {}, isFetching, refetch, isError, error: err } = response;

  const toast = useToast();
  useEffect(() => {
    if (isError) {
      let { message } = err?.data;
      if (err.data.errors) message = JSON.stringify(err.data.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, err]);

  const { data: games } = data;

  useEffect(refetch, [currentTab, myScores]);

  return (
    <Container>
      <RoundBanner source={require('../../../../assets/images/roundImage.png')}>
        <InnerBanner>
          <H3 style={{ color: colors.card }}>Round of 64</H3>
        </InnerBanner>
      </RoundBanner>
      <TopTab
        tabs={Object.keys(statuses).map(title => ({ title }))}
        shadowVisible={false}
        onTabPress={title => setCurrentTab(statuses[title])}
      />
      <Separator size='sm' />
      {isFetching ? (
        <ActivityIndicator
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
          color={colors.primary}
          size='large'
        />
      ) : games.length ? (
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
          {games.map(({ teamA, teamB, eventDate, gameClock }, idx) => {
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
                      {currentTab === 'STATUS_IN_PROGRESS' ? (
                        <H6 style={{ color: colors.primary }}>{gameClock}- 1st</H6>
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
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <H4>No games matching your search!</H4>
        </View>
      )}
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
  background-color: white;
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
  // line-height: 18px;
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
