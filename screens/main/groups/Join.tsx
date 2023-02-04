import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import styled from 'styled-components';
import Button from '../../../components/common/Buttons';
import PinCodeInput from '../../../components/common/PinCodeInput';
import { useAppSelector } from '../../../hooks/useStore';
import { useJoinGroupMutation } from '../../../store/api-queries/group-queries';
import { ErrorMessage, H2, H6, Paragraph } from '../../../styles/styled-elements';

const JoinGroupScreen = ({ navigation }) => {
  const group = useAppSelector(({ groups }) => groups.selectedGroup);
  const [joinGroup, { isLoading, error: err, isError }] = useJoinGroupMutation();
  const toast = useToast();
  const { colors } = useTheme();

  useEffect(() => {
    if (isError) {
      let { message } = err?.data;
      if (err.data.errors) message = JSON.stringify(err.data.errors);
      toast.show(message, {
        type: 'danger',
        placement: 'center',
        animationType: 'zoom-in',
      });
    }
  }, [isError, err]);

  const [PIN, setPIN] = useState<string>('');
  const [error, setError] = useState<unknown | Error>(null);
  const { bottom } = useSafeAreaInsets();

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
    <KeyboardAvoidingView
      behavior={Platform.select({ android: 'height', ios: 'padding' })}
      style={{
        flex: 1,
        paddingHorizontal: 15,
        marginBottom: bottom,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <View
        style={{
          flex: 0.56,
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <H2>Join Existing Group</H2>
        <GroupNameContainer style={{ width: '100%' }}>
          <H6 style={{ color: colors.gray }}>Group name</H6>
          <GroupName>{group?.groupName}</GroupName>
        </GroupNameContainer>
        <PinCodeInput value={PIN} onChangeText={PINValueChangeHandler} />
        <View>{error ? <ErrorMessage w-100>{error}</ErrorMessage> : null}</View>
      </View>

      <Button
        containerStyle={{ width: '100%' }}
        text='Join'
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading || PIN.length < 4}
      />
    </KeyboardAvoidingView>
  );
};

const GroupNameContainer = styled(View)`
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
