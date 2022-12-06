import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RadioButton from '../../../components/common/RadioButton';
import { useAppDispatch } from '../../../hooks/useStore';
import { IGroup, ITournament } from '../../../interfaces';
import { useGetTournamentsQuery } from '../../../store/api-queries/tournaments';
import { selectTournament } from '../../../store/slices/tournament';
import { Container, ErrorMessage, H3, H4, ListItem, Title } from '../../../styles/styled-elements';

type ParamProps = { title?: string; msg404?: string; btnText?: string };

const SelectTourScreen = () => {
  const { params } = useRoute<{ params: ParamProps } & any>();
  const {
    title = 'Select Tournament',
    btnText = 'Confirm Selection',
    msg404 = 'No tournament that matches your search..!',
  } = params ?? {};
  const { colors } = useTheme();
  const [selectedItem, setSelectedItem] = useState<ITournament>();
  const { isLoading, isError, error, data: tournaments = [] } = useGetTournamentsQuery();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSelect = () => {
    dispatch(selectTournament(selectedItem));
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}
    >
      <Title style={{ textTransform: 'capitalize', marginBottom: 20 }}>{title}</Title>
      {isLoading ? (
        <ActivityIndicator size='large' color={colors.primary} />
      ) : (
        <FlatList
          data={tournaments}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }: { item: ITournament }) => (
            <ListItem key={item.id}>
              <RadioButton
                selected={selectedItem?.id === item.id}
                color={colors.primary}
                text={item.name}
                onClick={text => setSelectedItem(item)}
              />
            </ListItem>
          )}
          ListFooterComponent={
            <View>{isError && <ErrorMessage>{JSON.stringify(error) ?? msg404}</ErrorMessage>}</View>
          }
        />
      )}
      <TouchableOpacity
        style={{
          backgroundColor: !!selectedItem ? colors.primary : '#CCCCCC',
          padding: 15,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={handleSelect}
        disabled={!selectedItem}
        activeOpacity={0.8}
      >
        <H4 style={{ color: 'white' }}>{btnText}</H4>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SelectTourScreen;
