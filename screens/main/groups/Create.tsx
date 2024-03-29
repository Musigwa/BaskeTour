import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import * as Yup from 'yup';

import { useCreateGroupMutation } from '../../../store/queries/group';

import Button from '../../../components/common/Buttons';
import Input from '../../../components/common/Input';
import Loading from '../../../components/common/Loading';
import PinCodeInput from '../../../components/common/PinCodeInput';

import { useToast } from 'react-native-toast-notifications';
import { Paragraph, View } from '../../../styles/styled-elements';
import { SetupStackScreenProps } from '../../../types';

const CreateGroupScreen = ({ navigation }: SetupStackScreenProps<'CreateGroup'>) => {
  const [error, setError] = useState('');
  const insets = useSafeAreaInsets();

  const [createGroup, { isLoading, error: err, isError }] = useCreateGroupMutation();

  const toast = useToast();
  useEffect(() => {
    if (isError) {
      let { message } = err?.data;
      if (err.data.errors) message = JSON.stringify(err.data.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, err]);

  const GroupSchema = Yup.object().shape({
    name: Yup.string().required('Group name is required'),
    pin: Yup.string().required('Pin should be four numbers, no letters'),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Loading show={isLoading} text='Genrating Group ID' />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container pb={insets.bottom} content-center items-center>
          <Title mb={80}>Create New Group</Title>
          <Formik
            initialValues={{ pin: '', name: '' }}
            validationSchema={GroupSchema}
            onSubmit={async values => {
              try {
                const res = await createGroup({
                  groupName: values.name,
                  groupPIN: values.pin,
                }).unwrap();
                console.log('res---', res);
                navigation.push('ShareGroup');
              } catch (error) {
                console.log('error', error);
                setError(error?.data?.message);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
              <View w-100>
                <Input
                  placeholder=''
                  label='Group Name'
                  name='name'
                  required
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors.name}
                />
                <View mt={45}>
                  <Paragraph>{values.pin}</Paragraph>
                  <PinCodeInput
                    value={values.pin}
                    onChangeText={(pin: string) => setFieldValue('pin', pin)}
                  />
                </View>
                <View>
                  <ErrorMessage mt={5} w-100>
                    {errors.pin}
                  </ErrorMessage>
                </View>
                <View w-100 mt={40} flex-row justify-center align-center>
                  {error && <ErrorMessage w-100>{error}</ErrorMessage>}
                </View>
                <Button
                  text='Create Group'
                  containerStyle={{ width: '100%' }}
                  onPress={handleSubmit}
                  loading={isLoading}
                />
              </View>
            )}
          </Formik>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const Container = styled(View)`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
`;

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: bold;
`;

const ErrorMessage = styled(Paragraph)`
  color: #ee3c15;
  text-align: center;
  font-size: 12px;
  //  font-family: "Montserrat";
`;

export default CreateGroupScreen;
