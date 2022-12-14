import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { findIndex, isEqual } from 'lodash';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import styled from 'styled-components/native';
import defLogo from '../../../../assets/images/defLogo.png';
import CountDown from '../../../../components/common/CountDown';
import GroupSelector from '../../../../components/common/GroupSelector';
import TopTab from '../../../../components/common/TopTab';
import { useAppSelector } from '../../../../hooks/useStore';
import {
  useGetGamesQuery,
  useGetTournamentsQuery,
} from '../../../../store/api-queries/tournaments';
import { H2, H4, Horizontal, Separator } from '../../../../styles/styled-elements';

type Pick = { eventId: string; teamId: string };
const statuses = [{ title: 'East' }, { title: 'South' }, { title: 'Midwest' }, { title: 'West' }];

const PicksScreen = () => {
  const { colors } = useTheme();
  const [picks, setPicks] = useState<Pick[]>([]);
  const selectedGroup = useAppSelector(({ groups }) => groups.selectedGroup);
  const navigation = useNavigation();
  const toast = useToast();

  const {
    data: { data: games = [] } = {},
    isFetching,
    isError,
    error: err,
  } = useGetGamesQuery({ status: 'STATUS_SCHEDULED' }, { refetchOnReconnect: true });
  const { data: [tournament] = [] } = useGetTournamentsQuery();
  const [round] = tournament?.rounds ?? [null];
  const [limit] = useState(round?.allowedPicks ?? 3);

  useEffect(() => {
    if (isError) {
      let { message } = err?.data;
      if (err.data.errors) message = JSON.stringify(err.data.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, err]);

  useLayoutEffect(() => {
    navigation.setParams({
      picks,
      roundId: round?.id,
      groupId: selectedGroup?.id,
      canSubmit: picks.length === limit,
    });
  }, [picks.length, selectedGroup?.id]);

  const updatePicks = (pick: Pick) => {
    const temp = [...picks];
    const peIdx = findIndex(picks, pick);
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
    if (!isEqual(picks, temp)) setPicks(temp);
  };

  return (
    <Container>
      <GroupSelector />
      <Separator size='sm' />
      <TopTab tabs={statuses} />
      <Separator size='sm' />
      {isFetching ? (
        <ActivityIndicator
          color={colors.primary}
          size='large'
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        />
      ) : games.length ? (
        <>
          <View style={{ padding: 15 }}>
            <Headline style={{ color: colors.primary }}>Time remaining to make picks</Headline>
            <CountDown date={games[0].eventDate} />
            <Separator />
            <H2 style={{ marginTop: 35, marginBottom: 10, textTransform: 'normal' }}>
              Pick teams to win
            </H2>
            <Headline style={{ color: colors.primary }}>
              Select {limit} teams for {round?.name}
            </Headline>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {games.map((event, idx) => {
              const { id, teamA, teamB, eventDate } = event;
              const eventId = event.eventId ?? id;
              return (
                <View key={idx}>
                  {[teamA, teamB].map(({ teamId, logo = defLogo, name, ranking }, i) => (
                    <View key={i} style={{ paddingHorizontal: 15 }}>
                      <Card
                        style={{
                          backgroundColor:
                            findIndex(picks, { teamId, eventId }) !== -1
                              ? colors.primary
                              : colors.card,
                        }}
                        activeOpacity={0.8}
                        onPress={() => updatePicks({ teamId, eventId })}
                      >
                        <Horizontal style={{ flex: 0.86 }}>
                          <AvatarContainer>
                            <Image
                              source={logo}
                              resizeMode='contain'
                              resizeMethod='auto'
                              style={{ width: 35, height: 35 }}
                            />
                          </AvatarContainer>
                          <View>
                            <BoldText style={{ fontSize: 12 }}>
                              {moment(eventDate).format('ddd, MM/D/YYYY, h:mm A')}
                            </BoldText>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <BoldText style={{ fontSize: 14, color: '#979797' }}>
                                ({ranking})
                              </BoldText>
                              <BoldText style={{ fontSize: 18 }}>{name}</BoldText>
                            </View>
                          </View>
                        </Horizontal>
                        <AntDesign name='checksquare' size={24} color={colors.background} />
                      </Card>
                      {!i ? (
                        <BoldText style={{ fontSize: 12, textAlign: 'center' }}>VS</BoldText>
                      ) : null}
                    </View>
                  ))}
                  {idx !== games.length - 1 ? <Separator /> : null}
                </View>
              );
            })}
          </ScrollView>
        </>
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <H4>No scheduled games yet to pick from!</H4>
        </View>
      )}
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

const HorizontalView = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const MedBoldText = styled.Text`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-align: left;
`;

const Card = styled(HorizontalView)`
  background: white;
  box-shadow: 0px 0px 20px rgba(35, 20, 115, 0.08);
  border-radius: 4px;
  padding: 25px;
  margin-vertical: 20px;
`;

const AvatarContainer = styled.ImageBackground`
  background: #ffffff;
  border: 2px solid #cccccc;
  border-radius: 4px;
  width: 54px;
  height: 54px;
  justify-content: center;
  align-items: center;
`;

const BoldText = styled.Text`
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.8px;
`;

export default PicksScreen;
