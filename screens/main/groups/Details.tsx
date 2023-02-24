import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Menu } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import RenderAvatar from '../../../components/common/Avatar';
import Loading from '../../../components/common/Loading';
import { useAppSelector } from '../../../hooks/useStore';
import {
  useRemoveGroupMutation,
  useRemoveGroupPlayerMutation,
  useUpdateGroupMutation,
} from '../../../store/queries/group';
import { H2, H3, H5, H6, Horizontal, Separator } from '../../../styles/styled-elements';
import { ellipsizeText } from '../../../utils/methods';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

const GroupDetailsScreen = ({ route, navigation }) => {
  const [requestGroupRemoval, { isLoading: isFetching }] = useRemoveGroupMutation();
  const [requestGroupUpdate, { isLoading: inProgress }] = useUpdateGroupMutation();
  const { user, myGroups } = useAppSelector(({ auth: { user }, groups: { myGroups } }) => ({
    user,
    myGroups,
  }));
  const { group: passedGroup } = route.params;
  const group = myGroups.find(group => group.id === passedGroup.id) || passedGroup;
  const isAdmin = useMemo(() => group.creator === user.id, [group.creator, user.id]);
  const [visible, setVisible] = useState(false);
  const [PIN, setPIN] = useState(group.groupPIN || '');
  const [groupName, setGroupName] = useState(group.groupName || '');
  const ref = useBlurOnFulfill({ value: PIN, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: PIN,
    setValue: setPIN,
  });

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: isAdmin ? headerRight : null, title: group.groupName });
  }, [navigation, isFetching, inProgress, visible]);

  const { colors } = useTheme();
  const toast = useToast();
  const [pressedPlayer, setPressedPlayer] = useState({});
  const [requestPlayerRemoval, { isLoading }] = useRemoveGroupPlayerMutation({});

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
        await requestPlayerRemoval({ groupId: group.id, playerId: player.id }).unwrap();
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
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const handleDeleteGroup = () => {
      removeGroup(group);
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
        <Menu.Item
          onPress={handleDeleteGroup}
          title='Delete Group'
          leadingIcon='selection-ellipse-remove'
        />
      </Menu>
    );
  };

  const blurHandler = async e => {
    try {
      if (
        PIN.length === CELL_COUNT &&
        groupName.length > 0 &&
        (PIN !== group.groupPIN || groupName !== group.groupName)
      ) {
        const { status } = await requestGroupUpdate({
          groupName,
          groupPIN: PIN,
          groupId: group.id,
        }).unwrap();
        if (status === 201)
          toast.show('Updating group succeeded!', { type: 'success', placement: 'center' });
      } else toast.show('Please input valid entries!', { type: 'warning', placement: 'center' });
    } catch (error) {
      setPIN(group.groupPIN);
      setGroupName(group.groupName);
      toast.show(error?.data?.message ?? 'Something went wrong, try again!', {
        type: 'danger',
        placement: 'center',
      });
    }
  };

  useEffect(() => {
    if (PIN.length === CELL_COUNT) ref.current?.blur();
  }, [PIN]);

  return inProgress ? (
    <Loading show={inProgress} text='Saving changes...' showBall={false} />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <Separator style={{ marginVertical: 5 }} />
      <View style={{ padding: 15 }}>
        <H6 style={{ color: colors.gray, marginBottom: 5 }}>Group Name</H6>
        <TextInput
          defaultValue={groupName}
          underlineColorAndroid='transparent'
          onChangeText={setGroupName}
          editable={isAdmin}
          onBlur={blurHandler}
        />

        <Separator style={{ marginTop: 10, marginBottom: 15 }} />
        <H6 style={{ color: colors.gray, textTransform: 'none' }}>Group PIN code</H6>
        <CodeField
          ref={ref}
          {...props}
          value={PIN}
          onChangeText={setPIN}
          cellCount={CELL_COUNT}
          keyboardType='number-pad'
          textContentType='oneTimeCode'
          onBlur={blurHandler}
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              onLayout={getCellOnLayoutHandler(index)}
              style={[styles.cell, isFocused && styles.focusCell, { borderColor: colors.gray }]}
            >
              <Text>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />
      </View>
      <Horizontal style={{ marginHorizontal: 15 }}>
        <View style={{ flex: 0.8 }}>
          <H2>{group?.availableSpots}</H2>
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
        {/* <View style={{ backgroundColor: 'rgba(255, 111, 97, 0.29)', borderRadius: 30, padding: 5 }}>
          <Entypo name='plus' size={24} color={colors.primary} onPress={handleAddPlayers} />
        </View> */}
      </Horizontal>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {_.sortBy(group.players, p => !p.isAdmin).map((player, idx) => {
          const name =
            !player.firstName && !player.lastName
              ? player.email
              : `${player.firstName} ${player.lastName}`;
          const label =
            player.firstName && player.lastName
              ? `${player.firstName.charAt(0)}${player.lastName.charAt(0)}`
              : `${player?.email?.slice(0, 2)}`;
          const isAdmin = player.isAdmin || group?.creator === player?.id;
          const isMe = player.id === user?.id;
          const isPressed = pressedPlayer?.id === player.id;
          const isRemovable = isAdmin === false;
          const canRemove = user.id === group.creator;
          return (
            <View key={idx} style={{ backgroundColor: isMe ? colors.pink : undefined }}>
              <Horizontal key={idx} style={{ padding: 24 }}>
                <Horizontal>
                  <RenderAvatar uri={player?.profilePic} label={label} />
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
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 10,
    fontSize: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
