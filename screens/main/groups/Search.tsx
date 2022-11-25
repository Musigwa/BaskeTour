import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { FlatList, Pressable, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import RadioButton from '../../../components/common/RadioButton';
import {
  BackButtonWrapper,
  Container,
  ErrorMessage,
  H3,
  Paragraph,
  Title,
  View,
} from '../../../styles/styled-elements';

import React, { useEffect, useCallback, useState } from 'react';

import Input from '../../../components/common/Input';
import styled from 'styled-components/native';
import { IGroup } from '../../../interfaces';
import { useGetGroupsQuery } from '../../../store/api-queries/group-queries';
import { Formik } from 'formik';
import { debounce } from 'lodash';
import { JoinGroupStackParamList } from '../../../types';
import { MaterialIcons } from '@expo/vector-icons';

type GroupSearchProps = {
  onSelect: (group: IGroup) => void;
  title?: string;
  msg404?: string;
  btnText?: string;
};

const SearchGroup = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(true);
  const [selectedItem, setSelectedItem] = useState<IGroup>();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { params } = useRoute();
  const {
    title = 'Join Existing Group',
    confirmBtn = {},
    msg404 = 'Group does not exist. Contact your group admin',
  } = params ?? {};
  const { text = 'Confirm Selection', onPress = () => {} } = confirmBtn;

  const {
    data: groups,
    isLoading,
    refetch,
  } = useGetGroupsQuery({ searchQuery: searchQuery }, { skip });

  const handleJoinGroup = (group: IGroup) => {
    navigation.navigate(group.availableSpots ? 'JoinGroup' : 'FullGroup', { group });
  };

  const debouncedUpdate = debounce(text => setSearchQuery(text), 300, {
    leading: true,
    trailing: false,
  });

  useEffect(() => {
    if (searchQuery.length) setSkip(false);
  }, [searchQuery]);

  return (
    <Container>
      <SafeAreaView style={{ alignItems: 'center' }}>
        <Title>Join existing Group</Title>
        <Formik
          initialValues={{
            searchQuery: '',
          }}
          onSubmit={refetch}
        >
          {({ handleChange, values }) => {
            debouncedUpdate(values.searchQuery);
            return (
              <View mb={40} mt={40}>
                <Input
                  placeholder='Type a group name to search...'
                  name='searchQuery'
                  required
                  handleChange={handleChange}
                  handleBlur={() => {}}
                />
              </View>
            );
          }}
        </Formik>
        {/* </View> */}
        <FlatList
          data={groups?.data ?? []}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }: { item: IGroup }) => (
            <GroupListItem key={item.id}>
              <RadioButton
                selected={selectedItem?.id === item.id}
                color={colors.primary}
                text={item.groupName}
                onClick={text => setSelectedItem(item)}
              />
            </GroupListItem>
          )}
          ListFooterComponent={
            <View>
              {!isLoading && groups && Array.isArray(groups.data) && groups.data.length === 0 && (
                <ErrorMessage>{msg404}</ErrorMessage>
              )}
            </View>
          }
        />
        <TouchableOpacity
          style={{
            backgroundColor: !!selectedItem ? colors.primary : '#CCCCCC',
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={() => onPress(selectedItem)}
          disabled={!selectedItem}
        >
          <H3 style={{ color: 'white' }}>{text}</H3>
        </TouchableOpacity>
      </SafeAreaView>
    </Container>
  );
};

export const searchGroupScreenOptions = ({ navigation }) => ({
  headerShown: true,
  headerTitle: '',
  headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#fff' },

  headerLeft: props => (
    <BackButtonWrapper>
      <Pressable onPress={navigation.goBack} {...props}>
        <MaterialIcons name='arrow-back-ios' size={24} color='black' />
      </Pressable>
    </BackButtonWrapper>
  ),
});

const GroupListItem = styled(View)`
  padding: 12px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default SearchGroup;
