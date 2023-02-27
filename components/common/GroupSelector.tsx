import { AntDesign, Entypo } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { useGetMyGroupsQuery } from '../../store/queries/group';
import { selectGroup } from '../../store/slices/group';
import { H4, H5, Horizontal, Separator } from '../../styles/styled-elements';
import SearchPaginated from './Lists/SearchPaginated';

const GroupDropdown = () => {
  const dispatch = useAppDispatch();
  /**
   * Invoke useGetMyGroupsQuery to get the groups.
   * This is necessary for setting the default group
   */
  useGetMyGroupsQuery({});
  const selectedGroup = useAppSelector(({ groups: { selectedGroup } }) => selectedGroup);
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [myGroups, setMyGroups] = useState([]);
  const toggleMenu = () => setOpen(prev => !prev);

  const handleSelect = selectedItem => {
    dispatch(selectGroup(selectedItem));
    setOpen(false);
  };

  const disabled = useMemo(() => myGroups.length === 1, [myGroups.length]);

  useEffect(() => {
    if (disabled) dispatch(selectGroup(myGroups[0]));
  }, [myGroups.length]);

  return (
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      style={styles.container}
      contentStyle={styles.contentStyle}
      anchor={
        <Pressable onPress={toggleMenu} style={styles.anchorContainer} disabled={disabled}>
          <H4>{selectedGroup?.groupName ?? 'Select group'}</H4>
          {disabled ? null : <Entypo name={`chevron-small-${open ? 'up' : 'down'}`} size={20} />}
        </Pressable>
      }
    >
      {disabled ? null : (
        <SearchPaginated
          data={myGroups}
          updateData={setMyGroups}
          fetchMethod={useGetMyGroupsQuery}
          searchable={false}
          renderItem={({ item, index }) => {
            const selected = selectedGroup?.id === item.id;
            return (
              <Pressable onPress={() => handleSelect(item)}>
                <Horizontal key={index} style={{ paddingVertical: 15 }}>
                  <H5 style={{ color: selected ? colors.primary : 'black' }}>{item.groupName}</H5>
                  {selected ? <AntDesign name='check' size={24} color={colors.primary} /> : null}
                </Horizontal>
              </Pressable>
            );
          }}
          ItemSeparatorComponent={Separator}
          ListLoadMoreComponent={() => <ActivityIndicator size='large' />}
          ListEndComponent={() => <H5>End of list!</H5>}
        />
      )}
    </Menu>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: '100%' },
  contentStyle: { height: 400, width: 300, backgroundColor: 'white', alignSelf: 'center' },
  anchorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
export default GroupDropdown;
