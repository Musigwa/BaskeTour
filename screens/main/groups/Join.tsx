import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import styled from 'styled-components';
import Button from '../../../components/common/Buttons';
import PinCodeInput from '../../../components/common/PinCodeInput';
import { useAppSelector } from '../../../hooks/useStore';
import { useJoinGroupMutation } from '../../../store/api-queries/group-queries';
import {
  BackButtonWrapper,
  ErrorMessage,
  Paragraph,
  Title,
  View,
} from '../../../styles/styled-elements';
import Container from '../../../components/common/Container';

const JoinGroupScreen = ({ navigation }) => {
  const group = useAppSelector(({ groups }) => groups.selectedGroup);
  const [joinGroup, { isLoading, error: err, isError }] = useJoinGroupMutation();
  const toast = useToast();
  useEffect(() => {
    if (isError) {
      let { message } = err?.data;
      if (err.data.errors) message = JSON.stringify(err.data.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, err]);

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
      await joinGroup({ groupId: group.id, groupPIN: PIN }).unwrap();
      navigation.navigate('SuccessGroup', { group });
    } catch (error) {
      setError(error.data.message);
    }
  };

  const PINValueChangeHandler = (pin: string) => setPIN(pin);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
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
