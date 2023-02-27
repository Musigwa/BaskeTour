import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
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
} from '../../../../store/queries/tournament';
import { H3, Separator } from '../../../../styles/styled-elements';
import pickItem from './ListItem';
import { IGame } from '../../../../interfaces';

type Pick = { eventId: string; teamId: string; groupId: string };
const statuses = [{ title: 'East' }, { title: 'South' }, { title: 'Midwest' }, { title: 'West' }];

const PicksScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const toast = useToast();

  useGetTournamentsQuery();
  const { selectedGroup, round, tournament } = useAppSelector(({ groups, tournament }) => ({
    selectedGroup: groups.selectedGroup,
    round: tournament.activeRound,
    tournament: tournament.selectedTour,
  }));

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
  const [games, setGames] = useState([]);
  const [limit] = useState(round?.allowedPicks ?? 3);
  const [savePicks, { isLoading: loading }] = useCreatePickMutation();
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

  const picksChanged = useMemo(
    () => !picks.every(elmt => _.findIndex(prevPicks, elmt) !== -1),
    [prevPicks.length, picks.length]
  );

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

  const sortByDate = (games: IGame[] = []) => _.sortBy(games, 'eventDate');

  const timedOut = useMemo(
    () => new Date(sortByDate(games)[0]?.eventDate).getTime() <= new Date().getTime(),
    [sortByDate(games)[0]?.eventDate]
  );

  const updatePicks = (pick: Pick) => {
    // const timedOut = new Date(sortByDate(games)[0]?.eventDate).getTime() <= new Date().getTime();
    if (timedOut)
      return Alert.alert(
        'Picking timeout!',
        `Picks are locked because the current round \u21C0 "${round?.name}" has begun`
      );
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

  // Perform a fetch to get the previous picks for the selected group.
  useEffect(refetchPicks, [selectedGroup?.id, round?.id]);

  return (
    <>
      <GroupSelector />
      <Separator size='sm' />
      <TopTab tabs={statuses} />
      <Separator size='sm' />
      {games.length ? (
        <View style={{ paddingHorizontal: 15, paddingTop: 2 }}>
          <H3 style={{ color: colors.primary, textTransform: 'none' }}>
            Time remaining to make picks
          </H3>
          <CountDown date={sortByDate(games)[0]?.eventDate} />
          <Separator />
          <H3 style={{ paddingVertical: 8, textTransform: 'none' }}>Pick teams to win</H3>
          <H3 style={{ color: colors.primary, textTransform: 'none' }}>
            Select {limit} teams for {round?.name}
          </H3>
        </View>
      ) : null}

      <SearchPaginated
        fetchMethod={useGetGamesQuery}
        data={timedOut ? [] : sortByDate(games)}
        updateData={setGames}
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
        emptyListText={
          games.length && timedOut
            ? `Picking is disabled since "${round?.name}" has started.`
            : `No scheduled games to pick from for "${round?.name}".`
        }
      />
    </>
  );
};

export default PicksScreen;
