import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import styled from 'styled-components/native';
import CountDown from '../../../../components/common/CountDown';
import GroupSelector from '../../../../components/common/GroupSelector';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import TopTab from '../../../../components/common/TopTab';
import { useAppSelector } from '../../../../hooks/useStore';
import {
  useCreatePickMutation,
  useGetGamesQuery,
  useGetPicksQuery,
  useGetTournamentsQuery,
} from '../../../../store/api-queries/tournaments';
import { H2, Separator } from '../../../../styles/styled-elements';
import { getActiveRound } from '../../../../utils/methods';
import pickItem from './ListItem';

type Pick = { eventId: string; teamId: string; groupId: string };
const statuses = [{ title: 'East' }, { title: 'South' }, { title: 'Midwest' }, { title: 'West' }];

const PicksScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const toast = useToast();

  const { data: [tournament] = [] } = useGetTournamentsQuery();
  const round = useMemo(() => getActiveRound(tournament), [tournament]) ?? tournament?.rounds[0];
  const selectedGroup = useAppSelector(({ groups }) => groups.selectedGroup);

  const {
    refetch: refetchPicks,
    isFetching: isFetchingPicks,
    data: { data: prevPicks = [] } = {},
  } = useGetPicksQuery({
    tournamentId: tournament?.id,
    roundId: round?.id,
    groupId: selectedGroup?.id,
  });

  const [picks, setPicks] = useState<Pick[]>([]);

  const {
    data: { data: scheduled = [] } = {},
    isError,
    error: err,
  } = useGetGamesQuery(
    { roundId: round?.id, status: 'STATUS_SCHEDULED' },
    { refetchOnReconnect: true }
  );

  const { data: { data: completed = [] } = {} } = useGetGamesQuery(
    { roundId: round?.id, status: 'STATUS_FINAL' },
    { refetchOnReconnect: true }
  );
  const [limit] = useState(round?.allowedPicks ?? 3);

  const [savePicks, { isLoading: loading, isError: errorThrown, error }] = useCreatePickMutation();

  useEffect(() => {
    if (isError) {
      let { message } = err?.data;
      if (err?.data?.errors) message = JSON.stringify(err?.data?.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, err, errorThrown]);

  const games = useMemo(
    () => (scheduled && scheduled.length ? scheduled : completed ?? []),
    [scheduled, completed]
  );

  useEffect(refetchPicks, [selectedGroup?.id]);
  useEffect(() => {
    const prev = prevPicks
      .filter(({ groupId }) => selectedGroup.id === groupId)
      .map(({ groupId, teamId, eventId }) => ({ groupId, teamId, eventId }));
    setPicks(prev);
  }, [isFetchingPicks]);

  const handleSavePicks = async () => {
    try {
      const { status } = await savePicks({
        roundId: round?.id,
        groupId: selectedGroup?.id,
        picks: picks.map(({ teamId, eventId }) => ({ teamId, eventId })),
      }).unwrap();
      if (status === 201) {
        toast.show(`Your picks for "${selectedGroup.groupName}" were saved!`, {
          type: 'success',
          placement: 'center',
        });
        refetchPicks();
      }
    } catch (error) {
      if (error.message) toast.show(error?.message, { type: 'danger', placement: 'center' });
      else if (error.data) toast.show(error?.data.message, { type: 'danger', placement: 'center' });
      else toast.show(JSON.stringify(error), { type: 'danger', placement: 'center' });
    }
  };

  const limitReached = useMemo(
    () => picks.length === limit && selectedGroup.id,
    [picks.length, limit, selectedGroup.id]
  );

  const picksChanged = !picks.every(elmt => _.findIndex(prevPicks, elmt) !== -1);

  useLayoutEffect(() => {
    navigation.setOptions({ headerLeft });
  }, [limitReached, loading, picksChanged, navigation]);

  const headerLeft = () => {
    const canSubmit = limitReached && !loading && picksChanged;
    return (
      <Button
        mode='outlined'
        onPress={handleSavePicks}
        labelStyle={{ fontSize: 18, fontWeight: '700' }}
        uppercase={false}
        style={{
          marginLeft: 15,
          borderColor: canSubmit ? colors.primary : colors.disabled,
          borderWidth: 2,
        }}
        theme={{ roundness: 8 }}
        disabled={!canSubmit}
        loading={loading}
      >
        {`Sav${loading ? 'ing' : 'e'}`}
      </Button>
    );
  };

  const updatePicks = (pick: Pick) => {
    const temp = [...picks];
    const peIdx = _.findIndex(picks, pick);
    const pickExists = peIdx !== -1;
    const geIdx = picks.findIndex(p => p.eventId === pick.eventId);
    const gameExists = geIdx !== -1;
    // If the given pick exists, revoke the selection
    if (pickExists) temp.splice(peIdx, 1);
    // If the game exists but with a !== team, replace the team
    else if (gameExists) temp.splice(geIdx, 1, pick);
    // Otherwise, check the limit before adding the pick
    else if (picks.length === limit)
      return Alert.alert('Limit reached', 'Try deselecting some picks first!');
    else temp.push(pick);
    if (!_.isEqual(picks, temp)) setPicks(temp);
  };

  return (
    <Container>
      <GroupSelector />
      <Separator size='sm' />
      <TopTab tabs={statuses} />
      <Separator size='sm' />
      <>
        {games.length ? (
          <View style={{ padding: 5 }}>
            <Headline style={{ color: colors.primary }}>Time remaining to make picks</Headline>
            <CountDown date={games[0]?.eventDate} />
            <Separator />
            <H2 style={{ marginTop: 8, marginBottom: 10, textTransform: 'none' }}>
              Pick teams to win
            </H2>
            <Headline style={{ color: colors.primary, marginBottom: 10 }}>
              Select {limit} teams for {round?.name}
            </Headline>
          </View>
        ) : null}

        <SearchPaginated
          style={{ padding: 0 }}
          fetchMethod={useGetGamesQuery}
          data={[]}
          searchable={false}
          params={{ roundId: round?.id, status: 'STATUS_SCHEDULED' }}
          renderItem={({ item, index }) =>
            pickItem({
              item,
              index,
              handlePress: updatePicks,
              colors,
              selectedGroup,
              prevPicks,
              picks,
              games,
            })
          }
          emptyListText='No scheduled games yet to pick from!'
        />
      </>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Headline = styled.Text`
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.8px;
  text-align: left;
`;

export default PicksScreen;
