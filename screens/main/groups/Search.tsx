import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Input from '../../../components/common/Input';
import { IGroup } from '../../../interfaces';
import { useGetGroupsQuery } from '../../../store/api-queries/group-queries';
import {
  BackButtonWrapper,
  Container,
  ErrorMessage,
  Paragraph,
  Title,
  View,
} from '../../../styles/styled-elements';

const SearchGroup = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(true);
  const {
    data: groups,
    isLoading,
    refetch,
  } = useGetGroupsQuery({ searchQuery: searchQuery }, { skip });

  const handleJoinGroup = (group: IGroup) => {
    navigation.navigate(group.availableSpots ? 'JoinGroup' : 'FullGroup', { group });
  };

  useEffect(() => {
    if (searchQuery.length) setSkip(false);
  }, [searchQuery]);

  const debouncedUpdate = _.debounce(text => setSearchQuery(text), 300, {
    leading: true,
    trailing: false,
  });

  return (
    <Container
      style={{
        justifyContent: 'flex-start',
        padding: 0,
      }}
    >
      <FlatList
        data={groups?.data ?? []}
        style={{ width: '100%', padding: 10 }}
        ListHeaderComponent={
          <View w-100 items-center>
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
                  <View w-100 mb={40} mt={40}>
                    <Input
                      placeholder='Group name'
                      label='Group name'
                      name='searchQuery'
                      required
                      handleChange={handleChange}
                      handleBlur={() => {}}
                    />
                  </View>
                );
              }}
            </Formik>
          </View>
        }
        keyExtractor={item => item.id}
        renderItem={({ item }: { item: IGroup }) => (
          <GroupListItem w-100 key={item.id}>
            <GroupListTitle>{item.groupName}</GroupListTitle>
            <Pressable onPress={() => handleJoinGroup(item)}>
              <JoinButton>
                <JoinButtonLabel>Join</JoinButtonLabel>
              </JoinButton>
            </Pressable>
          </GroupListItem>
        )}
        ListFooterComponent={
          <View w-100>
            {!isLoading && groups && Array.isArray(groups.data) && groups.data.length === 0 && (
              <ErrorMessage>Group does not exist. Contact your group admin</ErrorMessage>
            )}
          </View>
        }
      />
    </Container>
  );
};

export const searchGroupScreenOptions = ({ navigation }) => ({
  headerShown: true,
  headerTitle: '',
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#fff',
  },

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

const GroupListTitle = styled(Paragraph)`
  font-size: 16px;
`;

const JoinButton = styled(View)`
  width: 68px;
  height: 28px;
  background: rgba(255, 117, 91, 0.14);
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const JoinButtonLabel = styled(Paragraph)`
  color: #ff755b;
  font-size: 16px;
`;

export default SearchGroup;
