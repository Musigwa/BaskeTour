import { Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import React, { useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Avatar, Divider, Menu } from 'react-native-paper';
import { useAppSelector } from '../../../hooks/useStore';
import {
  useRemoveGroupMutation,
  useRemoveGroupPlayerMutation,
} from '../../../store/api-queries/group-queries';
import { H2, H3, H5, H6, Horizontal, Separator } from '../../../styles/styled-elements';
import { ellipsizeText } from '../../../utils/methods';
import { useToast } from 'react-native-toast-notifications';

const GroupDetailsScreen = ({ route, navigation }) => {
  const [requestGroupRemoval, { isLoading: isFetching }] = useRemoveGroupMutation({});
  useLayoutEffect(() => {
    navigation.setOptions({ headerRight });
  }, [navigation, isFetching]);
  const [pressedPlayer, setPressedPlayer] = useState({});
  const { group: passedGroup } = route.params;
  const { colors } = useTheme();
  const toast = useToast();
  const { user, myGroups } = useAppSelector(({ auth: { user }, groups: { myGroups } }) => ({
    user,
    myGroups,
  }));
  const group = myGroups.find(group => group.id === passedGroup.id) || passedGroup;
  const [requestPlayerRemoval, { isLoading }] = useRemoveGroupPlayerMutation({});

  const handleTextChange = text => {};
  const handleAddPlayers = () => {
    if (group.availableSpots === 0) toast.show('This group is full!', { type: 'danger' });
    // ADD THE PLAYER TO THE GROUP
  };

  const handleDeletePlayer = async player => {
    setPressedPlayer(player);
    const playerName =
      player.firstName && player.lastName
        ? `${player.firstName} ${player.lastName}`
        : `${player.email}`;

    const deletePlayer = async () => {
      try {
        const { message } = await requestPlayerRemoval({
          groupId: group.id,
          playerId: player.id,
        }).unwrap();
        console.log('data.message', message);
      } catch (e) {
        toast.show(e.data.message);
      }
    };

    Alert.alert(
      `Removing \u21C0 ${ellipsizeText(playerName, 8)}`,
      `Are you sure you want to remove "${playerName}" from "${group.groupName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { onPress: deletePlayer, text: 'Remove', style: 'destructive' },
      ]
    );
  };

  const removeGroup = group => {
    const deleteGroup = async () => {
      try {
        await requestGroupRemoval({ groupId: group.id }).unwrap();
        if (!isFetching) navigation.goBack();
      } catch (error) {
        toast.show(error.data.message, { type: 'danger', placement: 'center' });
      }
    };
    Alert.alert(
      `Deleting \u21C0 ${ellipsizeText(group.groupName, 8)}`,
      `Are you sure you want to delete the "${group.groupName}" group?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: deleteGroup },
      ],
      { cancelable: true }
    );
  };

  const headerRight = () => {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const handleDeleteGroup = () => {
      removeGroup(group);
      closeMenu();
    };
    const handleGroupShare = () => {
      closeMenu();
    };

    return (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          isFetching ? (
            <ActivityIndicator size='small' color={colors.primary} />
          ) : (
            <MaterialCommunityIcons
              name='dots-vertical'
              size={24}
              color='black'
              onPress={openMenu}
            />
          )
        }
        contentStyle={{ backgroundColor: 'white' }}
      >
        <Menu.Item onPress={handleGroupShare} title='Share Group' leadingIcon='share' />
        <Divider />
        <Menu.Item
          onPress={handleDeleteGroup}
          title='Delete Group'
          leadingIcon='selection-ellipse-remove'
        />
      </Menu>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Separator style={{ marginVertical: 5 }} />
      <View style={{ padding: 15 }}>
        <H6 style={{ color: colors.gray, marginBottom: 5 }}>Group Name</H6>
        <TextInput
          defaultValue={group.groupName}
          underlineColorAndroid='transparent'
          onChangeText={handleTextChange}
          editable={!!_.find(group.players, { id: user.id }) ? true : false}
        />
        <Separator style={{ marginTop: 10, marginBottom: 15 }} />
        <H6 style={{ color: colors.gray, textTransform: 'none' }}>Group PIN Code</H6>
        <Horizontal style={{ marginTop: 10 }}>
          {group.groupPIN.split('').map((digit, idx) => {
            return (
              <View style={{ flex: 0.15 }} key={idx}>
                <H6 key={idx} style={{ textAlign: 'center' }}>
                  {digit}
                </H6>
                <Separator size='md' style={{ marginTop: 5 }} />
              </View>
            );
          })}
        </Horizontal>
      </View>
      <Horizontal style={{ marginHorizontal: 15 }}>
        <View style={{ flex: 0.8 }}>
          <H2>{group.availableSpots}</H2>
          <H6>available spots</H6>
        </View>
        <View style={{ flex: 0.2 }}>
          <H2>{group.players.length}</H2>
          <H6>players</H6>
        </View>
      </Horizontal>
      <Separator style={{ marginVertical: 15 }} />
      <Horizontal style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
        <H3>Group Members</H3>
        <View style={{ backgroundColor: 'rgba(255, 111, 97, 0.29)', borderRadius: 30, padding: 5 }}>
          <Entypo name='plus' size={24} color={colors.primary} onPress={handleAddPlayers} />
        </View>
      </Horizontal>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {_.sortBy(group.players, p => !p.isAdmin).map((player, idx) => {
          const name =
            !player.firstName && !player.lastName
              ? player.email
              : `${player.firstName} ${player.lastName}`;
          const label =
            player.firstName && player.lastName
              ? `${player.firstName.charAt(0)} ${player.lastName.charAt(0)}`
              : `${player.email.slice(0, 2)}`;
          const isAdmin = player.isAdmin || group?.creator === player?.id;
          const isMe = player.id === user?.id;
          const isPressed = pressedPlayer?.id === player.id;
          const isRemovable = isAdmin === false;
          const canRemove = user.id === group.creator;
          return (
            <View key={idx} style={{ backgroundColor: isMe ? colors.pink : undefined }}>
              <Horizontal key={idx} style={{ padding: 24 }}>
                <Horizontal>
                  {player?.profilePic ? (
                    <Avatar.Image
                      size={50}
                      source={{ uri: player.profilePic }}
                      style={[styles.image]}
                    />
                  ) : (
                    <Avatar.Text size={50} label={label} />
                  )}
                  <View style={{ marginLeft: 10 }}>
                    <H5>{name}</H5>
                    <H6 style={{ color: colors.gray }}>{isAdmin ? 'Admin' : 'Player'}</H6>
                  </View>
                </Horizontal>
                {isRemovable && canRemove ? (
                  isPressed && isLoading ? (
                    <ActivityIndicator size='small' color={colors.primary} />
                  ) : (
                    <MaterialIcons
                      name='delete'
                      size={24}
                      color={colors.primary}
                      style={{ marginLeft: 5 }}
                      onPress={() => handleDeletePlayer(player)}
                    />
                  )
                ) : null}
              </Horizontal>
              <Separator />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupDetailsScreen;

const styles = StyleSheet.create({
  image: { width: 48, height: 48, borderRadius: 24 },
  noImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
