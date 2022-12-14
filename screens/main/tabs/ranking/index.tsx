import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import pp from '../../../../assets/images/pp.jpg';
import GroupSelector from '../../../../components/common/GroupSelector';
import TopTab from '../../../../components/common/TopTab';
import { IGroup } from '../../../../interfaces';
import { useGetGRankingsQuery } from '../../../../store/api-queries/group-queries';
import { useGetTournamentsQuery } from '../../../../store/api-queries/tournaments';
import { H2, H4, H5, H6, Horizontal, Separator } from '../../../../styles/styled-elements';

const RankingScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { data: [tournament] = [], isLoading } = useGetTournamentsQuery();

  const [selectedGroup] = useState<IGroup>();
  const [round, setRound] = useState<any>();

  const response = useGetGRankingsQuery(
    { groupId: selectedGroup?._id, tourRoundId: round?.id },
    { refetchOnReconnect: true }
  );
  const { data = Array(0).fill(0), isFetching, refetch, isError, error: err } = response;

  useEffect(refetch, [round]);

  return (
    <Container>
      <GroupSelector />
      <Separator size='sm' />
      {tournament.rounds.length ? (
        <TopTab
          tabs={tournament?.rounds?.map(r => ({ title: r.name, ...r }))}
          onTabPress={setRound}
        />
      ) : null}
      <Separator size='sm' />
      {isLoading || isFetching ? (
        <ActivityIndicator
          color={colors.primary}
          size='large'
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        />
      ) : data.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 30 }}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {data.map((player, idx) => (
            <TouchableOpacity key={idx} activeOpacity={0.8}>
              <View style={{ padding: 15 }}>
                <Horizontal>
                  <View>
                    <Horizontal>
                      <Image
                        source={pp}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                          marginRight: 10,
                        }}
                        resizeMode='cover'
                      />
                      <View>
                        <H5>dennis</H5>
                        <H5>rodman</H5>
                      </View>
                    </Horizontal>
                    <H6 style={{ alignSelf: 'flex-end', marginTop: 10 }}>1. TTU(12)</H6>
                  </View>
                  <View>
                    <View>
                      <H2>52</H2>
                      <H6>Total points</H6>
                    </View>
                    <H6 style={{ marginTop: 10 }}>2. OR(12)</H6>
                  </View>
                  <View>
                    <View>
                      <H2>1</H2>
                      <H6>Loss</H6>
                    </View>
                    <H6 style={{ marginTop: 10 }}>3. Nova(6)</H6>
                  </View>
                </Horizontal>
              </View>
              <Separator />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 10 }}
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
