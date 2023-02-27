import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { H3, H6, Horizontal, Separator } from '../../../../styles/styled-elements';

import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import { Pressable, StyleSheet, View } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import RadioButton from '../../../../components/common/RadioButton';
import TopTab from '../../../../components/common/TopTab';
import TeamContainer from '../../../../components/scores/TeamContainer';
import { useAppSelector } from '../../../../hooks/useStore';
import { useGetGamesQuery, useGetTournamentsQuery } from '../../../../store/queries/tournament';
import { GAME_STATUS } from '../../../../types';
import _ from 'lodash';

const ScoresScreen = ({ route }) => {
  const statuses = {
    upcoming: 'STATUS_SCHEDULED',
    live: 'STATUS_IN_PROGRESS',
    complete: 'STATUS_FINAL',
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
  const myScores = useMemo(
    () => !!params?.scoreType?.toLowerCase().includes('my score'),
    [params?.scoreType]
  );
  const options = currentTab === 'STATUS_IN_PROGRESS' ? { pollingInterval: 5000 } : undefined;
  useGetTournamentsQuery();
  const { activeRound, tournament } = useAppSelector(({ tournament }) => ({
    activeRound: tournament.activeRound,
    tournament: tournament.selectedTour,
  }));

  const [selectedRound, setSelectedRound] = useState(activeRound);
  const [games, setGames] = useState([]);

  const {
    refetch,
    isError,
    error: err,
  } = useGetGamesQuery({ roundId: selectedRound?.id, status: currentTab, myScores }, options);

  useEffect(() => {
    if (isError) {
      let { message } = err?.data;
      if (err.data.errors) message = JSON.stringify(err?.data?.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, err]);

  useEffect(() => {
    if (activeRound?.id) setSelectedRound(activeRound);
  }, [activeRound?.id]);

  useEffect(refetch, [currentTab, myScores, selectedRound?.id]);

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
      <TopTab
        tabs={Object.keys(statuses).map(title => ({ title }))}
        shadowVisible={false}
        onTabPress={({ title }) => setCurrentTab(statuses[title])}
      />
      <Separator size='sm' />
      <SearchPaginated
        data={_.sortBy(games, 'eventDate')}
        updateData={setGames}
        searchable={false}
        params={{ roundId: selectedRound?.id, status: currentTab, myScores }}
        options={options}
        fetchMethod={useGetGamesQuery}
        renderItem={({ item: { teamA, teamB, eventDate, gameClock }, index: idx }) => {
          return (
            <View key={idx}>
              <Horizontal>
                <TeamsWrapper style={{ flex: 0.76 }}>
                  {[teamA, teamB].map((team, idx) => {
                    const isWinner =
                      team.teamId === teamA.teamId
                        ? teamA.score > teamB.score
                        : team.teamId === teamB.teamId
                        ? teamB.score > teamA.score
                        : false;
                    return (
                      <TeamContainer
                        key={idx}
                        team={{ ...team, isWinner: isWinner }}
                        currentTab={currentTab}
                      />
                    );
                  })}
                </TeamsWrapper>
                <View
                  style={{
                    minHeight: 50,
                    width: StyleSheet.hairlineWidth,
                    backgroundColor: 'gray',
                  }}
                />
                {currentTab === 'STATUS_FINAL' ? (
                  <H6>Final</H6>
                ) : (
                  <View>
                    {currentTab === 'STATUS_IN_PROGRESS' ? (
                      <H6 style={{ color: colors.primary }}>{gameClock}- 1st</H6>
                    ) : (
                      <View>
                        <H6 style={{ fontWeight: 'bold' }}>
                          {moment(eventDate).format('ddd, MM/DD')}
                        </H6>
                        <H6 style={{ textTransform: 'none', fontWeight: 'bold' }}>
                          {moment(eventDate).format('LT')}
                        </H6>
                      </View>
                    )}
                    <H6>TCU -9.5</H6>
                  </View>
                )}
              </Horizontal>
              <Separator />
            </View>
          );
        }}
        emptyListText={emptyListText}
      />
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          paddingBottom: bottom,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {tournament?.rounds?.map((r, idx) => (
          <RadioButton
            key={idx}
            selected={selectedRound?.id === r?.id}
            color={colors.primary}
            text={r.name}
            onClick={() => {
              setSelectedRound(tournament?.rounds?.[idx]);
              actionSheetRef.current?.hide();
            }}
          />
        ))}
      </ActionSheet>
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
