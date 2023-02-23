import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { H3, H6, Horizontal, Separator } from '../../../../styles/styled-elements';

import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import { Pressable, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import RadioButton from '../../../../components/common/RadioButton';
import TopTab from '../../../../components/common/TopTab';
import TeamContainer from '../../../../components/scores/TeamContainer';
import {
  useGetGamesQuery,
  useGetTournamentsQuery,
} from '../../../../store/api-queries/tournaments';
import { GAME_STATUS } from '../../../../types';
import { getActiveRound } from '../../../../utils/methods';

const ScoresScreen = ({ route }) => {
  const statuses = {
    upcoming: 'STATUS_SCHEDULED',
    live: 'STATUS_IN_PROGRESS',
    completed: 'STATUS_FINAL',
  };

  const { bottom } = useSafeAreaInsets();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState<GAME_STATUS>('STATUS_SCHEDULED');
  const { params } = route;
  const toast = useToast();

  const emptyListText = useMemo(() => {
    switch (currentTab) {
      case 'STATUS_FINAL':
        return 'There are no completed games';
      case 'STATUS_IN_PROGRESS':
        return 'There are no live games';
      case 'STATUS_SCHEDULED':
        return 'There are no upcoming games';
      default:
        break;
    }
  }, [currentTab]);
  const myScores = !!params?.scoreType?.toLowerCase().includes('my score');
  const options = currentTab === 'STATUS_IN_PROGRESS' ? { pollingInterval: 5000 } : undefined;
  const { data: [tournament] = [] } = useGetTournamentsQuery();

  const activeRound =
    useMemo(() => getActiveRound(tournament), [tournament]) ?? tournament?.rounds[0];

  const [selectedRound, setSelectedRound] = useState(activeRound);

  const response = useGetGamesQuery(
    { roundId: selectedRound?.id, status: currentTab, myScores },
    options
  );
  const { refetch, isError, error: err } = response;

  useEffect(() => {
    if (isError) {
      let { message } = err?.data;
      if (err.data.errors) message = JSON.stringify(err.data.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, err]);

  useEffect(refetch, [currentTab, myScores, selectedRound]);

  return (
    <Container>
      <RoundBanner source={require('../../../../assets/images/roundImage.png')}>
        <Pressable
          onPress={actionSheetRef.current?.show}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(79, 20, 115, 0.74)',
          }}
        >
          <H3 style={{ color: colors.card }}>{selectedRound?.name}</H3>
        </Pressable>
      </RoundBanner>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          paddingBottom: bottom,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {tournament?.rounds.map((r, idx) => (
          <RadioButton
            key={idx}
            selected={selectedRound === r}
            color={colors.primary}
            text={r.name}
            onClick={() => {
              setSelectedRound(tournament?.rounds[idx]);
              actionSheetRef.current?.hide();
            }}
          />
        ))}
      </ActionSheet>
      <TopTab
        tabs={Object.keys(statuses).map(title => ({ title }))}
        shadowVisible={false}
        onTabPress={({ title }) => setCurrentTab(statuses[title])}
      />
      <Separator size='sm' />
      <SearchPaginated
        data={[]}
        searchable={false}
        params={{ roundId: selectedRound?.id, status: currentTab, myScores }}
        options={options}
        fetchMethod={useGetGamesQuery}
        renderItem={({ item: { teamA, teamB, eventDate, gameClock }, index: idx }) => {
          return (
            <View key={idx}>
              <Horizontal>
                <TeamsWrapper
                  style={{ flex: 0.76, borderRightWidth: 1.5, borderRightColor: '#e9ebed' }}
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
        }}
        emptyListText={emptyListText}
      />
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

export default ScoresScreen;
