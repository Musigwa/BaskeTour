import { AntDesign } from '@expo/vector-icons';
import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import styled from 'styled-components/native';
import { H3, H6, Horizontal, Separator } from '../../../../styles/styled-elements';

const pickItem = ({
  item: event,
  index: idx,
  handlePress,
  colors,
  selectedGroup,
  prevPicks,
  picks,
  games,
}) => {
  const { id: eventId, teamA, teamB, eventDate } = event;
  return (
    <View key={idx}>
      {[teamA, teamB].map(({ teamId, logo, name, ranking }, i) => {
        const [first, last] = name.split(' ');
        const label = `${first.slice(0, 1)} ${last?.length ? last.slice(0, 1) : first.slice(1, 2)}`;
        const groupId = selectedGroup.id;
        const selected = _.findIndex(picks, { teamId, eventId, groupId }) !== -1;
        return (
          <View key={i}>
            <Card
              style={{
                backgroundColor: selected ? colors.primary : colors.card,
                paddingHorizontal: 0,
              }}
              activeOpacity={0.8}
              onPress={() => handlePress({ teamId, eventId, groupId })}
            >
              <Horizontal style={{ justifyContent: 'flex-start', flex: 0.86 }}>
                {logo ? (
                  <Avatar.Image
                    size={54}
                    source={{ uri: logo }}
                    style={[styles.avatar, { backgroundColor: 'transparent' }]}
                  />
                ) : (
                  <Avatar.Text
                    size={54}
                    label={label}
                    labelStyle={{ color: colors.primary, fontSize: 18 }}
                    style={styles.avatar}
                  />
                )}
                <View style={{ justifyContent: 'space-around', height: 54, marginLeft: 15 }}>
                  <H6
                    style={{
                      fontSize: 12,
                      textTransform: 'none',
                      color: selected ? 'whitesmoke' : 'black',
                    }}
                  >
                    {moment(eventDate).format('ddd, MM/D/Y, h:mm A')}
                  </H6>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <H3
                      style={{
                        fontSize: 14,
                        color: selected ? 'whitesmoke' : '#979797',
                        marginRight: 5,
                      }}
                    >
                      ({ranking})
                    </H3>
                    <H3 style={{ fontSize: 18, color: selected ? 'white' : 'black' }}>{name}</H3>
                  </View>
                </View>
              </Horizontal>
              {_.findIndex(prevPicks, { teamId, eventId }) !== -1 ? (
                <AntDesign name='checksquare' size={24} color={colors.background} />
              ) : null}
            </Card>
            {!i ? <BoldText style={{ fontSize: 12, textAlign: 'center' }}>VS</BoldText> : null}
          </View>
        );
      })}
      {idx !== games.length - 1 ? <Separator style={{ marginVertical: 20 }} size='md' /> : null}
    </View>
  );
};

export default pickItem;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white',
  },
});

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

const Card = styled(HorizontalView)`
  background: white;
  box-shadow: 0px 0px 20px rgba(35, 20, 115, 0.08);
  border-radius: 4px;
  padding: 15px;
  margin-vertical: 10px;
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
