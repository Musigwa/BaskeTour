import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View as RNView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import RenderAvatar from '../../../../components/common/Avatar';
import GroupDropdown from '../../../../components/common/GroupSelector';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import TopTab from '../../../../components/common/TopTab';
import { useAppSelector } from '../../../../hooks/useStore';
import { useGetMyProfileQuery } from '../../../../store/queries/auth';
import { useGetGRankingsQuery } from '../../../../store/queries/group';
import { useGetTournamentsQuery } from '../../../../store/queries/tournament';
import { H2, H5, H6, Horizontal, Separator } from '../../../../styles/styled-elements';

const RankingScreen = () => {
  const { colors } = useTheme();

  const { data: [tournament] = [] } = useGetTournamentsQuery();
  const {
    data: { data: user },
  } = useGetMyProfileQuery({});
  const { selectedGroup } = useAppSelector(({ groups, auth }) => ({
    selectedGroup: groups.selectedGroup,
    user: auth.user,
  }));
  const rounds = tournament?.rounds?.map(r => ({ title: r.name, ...r }));
  const [round = [], setRound] = useState<any>(rounds?.[0]);
  const [rankings, setRankings] = useState([]);

  return (
    <Container>
      <GroupDropdown />
      <Separator size='sm' />
      {rounds?.length ? <TopTab tabs={rounds} onTabPress={setRound} /> : null}
      <Separator size='sm' />
      <SearchPaginated
        data={rankings}
        updateData={setRankings}
        searchable={false}
        style={{ paddingHorizontal: 0, paddingVertical: 0 }}
        contentContainerStyle={{ paddingVertical: 0 }}
        params={{ groupId: selectedGroup?.id, roundId: round?.id }}
        fetchMethod={useGetGRankingsQuery}
        renderItem={({ item: player, index: idx }) => {
          const picks = player?.picks ? [...player.picks] : [];
          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              style={{ backgroundColor: player?.id === user?.id && colors.pink }}
            >
              <View style={{ padding: 15 }}>
                <Horizontal>
                  <View>
                    <Horizontal>
                      <RenderAvatar
                        size={48}
                        label={`${player?.firstName.charAt('0')} ${player?.lastName.charAt('0')}`}
                        uri={player?.profilePic}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <H5>{player?.firstName}</H5>
                        <H5>{player?.lastName}</H5>
                      </View>
                    </Horizontal>
                  </View>
                  <View>
                    <View>
                      <H2>{player?.totalPoints}</H2>
                      <H6>Total points</H6>
                    </View>
                  </View>
                  <View>
                    <View>
                      <H2>{player?.totalLosses}</H2>
                      <H6 style={{ textTransform: 'none' }}>{`Loss${
                        player?.totalLosses > 1 ? 'es' : ''
                      }`}</H6>
                    </View>
                  </View>
                </Horizontal>
                <RNView
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: 13,
                    marginLeft: 50,
                  }}
                >
                  {picks.length
                    ? picks.map(({ team }, idx) => {
                        return (
                          <H6 key={idx} style={{}}>
                            {idx + 1}. ({team?.ranking}) {team?.abbreviation}
                          </H6>
                        );
                      })
                    : null}
                </RNView>
              </View>
              <Separator />
            </TouchableOpacity>
          );
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export default RankingScreen;
