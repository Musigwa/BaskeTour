import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { H2, H3, H5, H6, Horizontal, Separator } from '../../../styles/styled-elements';
import _ from 'lodash';

const GroupDetailsScreen = ({ navigation, route }) => {
  const { group } = route.params;
  const { colors } = useTheme();

  const handleTextChange = text => {};
  return (
    <View style={{ flex: 1 }}>
      <Separator style={{ marginVertical: 15 }} />
      <View style={{ padding: 24 }}>
        <H6 style={{ color: colors.gray }}>Group Name</H6>
        <TextInput
          defaultValue={group.groupName}
          underlineColorAndroid='transparent'
          onChangeText={handleTextChange}
        />
        <Separator style={{ marginTop: 10, marginBottom: 34 }} />
        <H6 style={{ color: colors.gray, textTransform: 'none' }}>Group PIN Code</H6>
        <Horizontal style={{ marginTop: 10 }}>
          {group.groupPIN.split('').map((digit, idx) => {
            return (
              <View style={{ flex: 0.15 }} key={idx}>
                <H6 key={idx} style={{ textAlign: 'center' }}>
                  {digit}
                </H6>
                <Separator size='md' style={{ marginTop: 10 }} />
              </View>
            );
          })}
        </Horizontal>
      </View>
      <Horizontal style={{ marginVertical: 10, paddingHorizontal: 24 }}>
        <H5>Link to share: bestgrouplink299230</H5>
        <AntDesign name='sharealt' size={24} color='black' />
      </Horizontal>
      <Separator style={{ marginVertical: 15 }} />
      <Horizontal style={{ marginHorizontal: 24 }}>
        <View style={{ flex: 0.65 }}>
          <H2>{group.availableSpots}</H2>
          <H6>available spots</H6>
        </View>
        <View style={{ flex: 0.35 }}>
          <H2>{group.players.length}</H2>
          <H6>players</H6>
        </View>
      </Horizontal>
      <Separator style={{ marginVertical: 20 }} />
      <Pressable
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 24,
        }}
      >
        <View
          style={{
            backgroundColor: 'rgba(255, 111, 97, 0.29)',
            borderRadius: 30,
            padding: 10,
          }}
        >
          <Entypo name='plus' size={30} color={colors.primary} />
        </View>
        <H2 style={{ marginLeft: 20, color: colors.primary }}>Add Players</H2>
      </Pressable>
      <Separator style={{ marginVertical: 15 }} />
      <H3 style={{ padding: 24 }}>Group Members</H3>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {_.sortBy(group.players, p => !p.isAdmin).map((player, idx) => {
          const name =
            !player.firstName && !player.lastName
              ? player.email
              : `${player.firstName} ${player.lastName}`;
          return (
            <View key={idx}>
              <Horizontal key={idx} style={{ margin: 24, marginTop: idx === 0 ? 0 : 24 }}>
                <Horizontal>
                  {player.profilePic ? (
                    <Image
                      source={{ uri: player.profilePic }}
                      style={[styles.image, { backgroundColor: colors.gray }]}
                      resizeMode='cover'
                    />
                  ) : (
                    <View style={[styles.noImage, { borderColor: colors.gray }]}>
                      <MaterialIcons name='no-photography' size={24} color={colors.gray} />
                    </View>
                  )}
                  <View style={{ marginLeft: 10 }}>
                    <H5>{name}</H5>
                    <H6 style={{ color: colors.gray }}>{idx === 0 ? 'Admin' : 'Player'}</H6>
                  </View>
                </Horizontal>
                {idx !== 0 ? (
                  <Horizontal>
                    <MaterialIcons
                      name='delete'
                      size={24}
                      color={colors.primary}
                      style={{ marginLeft: 5 }}
                    />
                  </Horizontal>
                ) : null}
              </Horizontal>
              <Separator />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default GroupDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  noImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
