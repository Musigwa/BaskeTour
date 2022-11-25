import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components';
import Button from '../../../components/common/Buttons';
import PinCodeInput from '../../../components/common/PinCodeInput';
import { useJoinGroupMutation } from '../../../store/api-queries/group-queries';
import {
  BackButtonWrapper,
  Container,
  ErrorMessage,
  Paragraph,
  Title,
  View,
} from '../../../styles/styled-elements';

const JoinGroupScreen = ({ navigation, route }) => {
  const {
    params: { group },
  } = route;

  const [joinGroup, { isLoading }] = useJoinGroupMutation();

  const [PIN, setPIN] = useState<string>('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [error, setError] = useState<unknown | Error>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      await joinGroup({
        groupId: group.id,
        groupPIN: PIN,
      }).unwrap();
      navigation.navigate('Groups', { screen: 'SuccessGroup', params: { group } });
    } catch (error) {
      setError(error.data.message);
    }
  };

  const PINValueChangeHandler = (pin: string) => setPIN(pin);
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={{ flex: 1 }}
    // >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container
        style={{
          justifyContent: 'flex-start',
        }}
      >
        <View w-100 flex={keyboardVisible ? 0.8 : 1} items-center>
          <Title>Join Existing Group </Title>

          <View w-100 mt={40}>
            <GroupNameContainer w-100>
              <GroupNameLabel>Group name</GroupNameLabel>
              <GroupName>{group?.groupName}</GroupName>
            </GroupNameContainer>
          </View>

          <View w-100 mb={30} mt={40}>
            <PinCodeInput value={PIN} onChangeText={PINValueChangeHandler} />
          </View>
          <View w-100 flex-row justify-center align-center>
            {error && <ErrorMessage w-100>{error}</ErrorMessage>}
          </View>
        </View>

        <View w-100 mb={30}>
          <Button
            text='Join'
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading || PIN.length < 4}
          />
        </View>
      </Container>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export const joinGroupScreenOptions = ({ navigation }) => ({
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

const GroupNameContainer = styled(View)`
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding: 14px 0 14px 0;
  border-color: #e9ebed;
`;

const GroupNameLabel = styled(Paragraph)`
  font-size: 12px;
  color: #8d8d8d;
  margin-bottom: 4px;
`;

const GroupName = styled(Paragraph)`
  font-size: 16px;
`;

export default JoinGroupScreen;
