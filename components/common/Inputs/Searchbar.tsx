import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { LegacyRef, forwardRef, useRef } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';
import { Horizontal } from '../../../styles/styled-elements';

type SearchbarProps = {
  isFetching: boolean;
  text: string;
  handleTextChange: (text: string) => void;
  clearText?: () => void;
};

const Searchbar = forwardRef(
  (
    { isFetching, text, handleTextChange, clearText }: SearchbarProps,
    ref?: LegacyRef<TextInput>
  ) => {
    const { colors } = useTheme();
    const inputRef = ref || useRef(null);

    const clearInput = () => {
      inputRef?.current?.clear();
      handleTextChange('');
    };

    return (
      <Horizontal style={styles.inputWrapper}>
        <Feather name='search' size={20} color='black' />
        <TextInput
          ref={inputRef}
          style={styles.input}
          onChangeText={handleTextChange}
          placeholder='Type to search...'
          placeholderTextColor={colors.gray}
          autoCapitalize='none'
          autoComplete='off'
          autoCorrect={false}
          returnKeyType='search'
        />
        {isFetching ? (
          <ActivityIndicator size='small' color={colors.gray} />
        ) : text.length ? (
          <Ionicons name='close' size={20} color='gray' onPress={clearText ?? clearInput} />
        ) : (
          <View style={{ width: 20 }} />
        )}
      </Horizontal>
    );
  }
);

export default Searchbar;

const styles = StyleSheet.create({
  inputWrapper: {
    height: 48,
    backgroundColor: 'rgba(241, 243, 245, 1)',
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 15,
    width: '100%',
  },
  input: { height: '100%', width: '82%', fontSize: 16, fontFamily: 'Poppins_500Medium' },
});
