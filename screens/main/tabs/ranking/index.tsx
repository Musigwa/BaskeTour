import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  View as RNView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import TopTab from '../../../../components/common/TopTab';
import { useAppSelector } from '../../../../hooks/useStore';
import { useGetGRankingsQuery } from '../../../../store/api-queries/group-queries';
import { useGetTournamentsQuery } from '../../../../store/api-queries/tournaments';
import { H2, H4, H5, H6, Horizontal, Separator } from '../../../../styles/styled-elements';
import GroupDropdown from '../../../../components/common/GroupSelector';

const RankingScreen = () => {
  const { colors } = useTheme();

  const { data: [tournament] = [], isLoading } = useGetTournamentsQuery();
  const { selectedGroup, user } = useAppSelector(({ groups, auth }) => ({
    selectedGroup: groups.selectedGroup,
    user: auth.user,
  }));
  const rounds = tournament?.rounds?.map(r => ({ title: r.name, ...r }));
  const [round, setRound] = useState<any>(rounds[0]);

  const {
    data: { data = [] } = {},
    isFetching,
    refetch,
    isError,
    error: err,
  } = useGetGRankingsQuery(
    { groupId: selectedGroup?.id, roundId: round?.id },
    { refetchOnReconnect: true }
  );

  useEffect(refetch, [round, selectedGroup]);

  return (
    <Container>
      <GroupDropdown />
      <Separator size='sm' />
      {rounds?.length ? <TopTab tabs={rounds} onTabPress={setRound} /> : null}
      <Separator size='sm' />
      {isFetching ? (
        <ActivityIndicator
          color={colors.primary}
          size='large'
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        />
      ) : data?.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 30 }}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {data.map((player, idx) => {
            const picks = player?.picks ? [...player.picks] : [];
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                style={{
                  backgroundColor: player?.id === user?.id && colors.pink,
                }}
              >
                <View style={{ padding: 15 }}>
                  <Horizontal>
                    <View>
                      <Horizontal>
                        {player?.profilePic ? (
                          <Image
                            source={{ uri: player.profilePic }}
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 24,
                              marginRight: 10,
                              backgroundColor: colors.gray,
                            }}
                            resizeMode='cover'
                          />
                        ) : (
                          <RNView
                            style={{
                              padding: 10,
                              borderRadius: 50,
                              borderWidth: 0.5,
                              borderColor: 'gray',
                              marginRight: 10,
                            }}
                          >
                            <MaterialIcons name='no-photography' size={30} color='gray' />
                          </RNView>
                        )}

                        <View>
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
                        <H6 style={{ textTransform: 'normal' }}>{`Loss${
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
                    {picks.map(({ team }, idx) => (
                      <H6 key={idx} style={{}}>
                        {idx + 1}. ({team?.ranking}) {team?.abbreviation}
                      </H6>
                    ))}
                  </RNView>
                </View>
                <Separator />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
          <H4 style={{ textAlign: 'center' }}>
            Nothing to show for the selected{' '}
            <H4 style={{ color: colors.primary }}>
              Group <H4>or</H4> Round
            </H4>
            !
          </H4>
        </View>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export default RankingScreen;
