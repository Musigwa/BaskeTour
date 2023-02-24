import { Formik } from 'formik';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import FakeButton from '../../components/common/Buttons';
import Input from '../../components/common/Input';

import { View } from 'react-native';
import { H2, H3 } from '../../styles/styled-elements';

import { Button, useTheme } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { useAppDispatch } from '../../hooks/useStore';
import { useForgotPassordMutation } from '../../store/queries/auth';

const ForgetPwdScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [requestForgotPassword, { isLoading }] = useForgotPassordMutation();
  const toast = useToast();

  const handleSubmit = async ({ email }) => {
    try {
      const { status } = await requestForgotPassword({ email }).unwrap();
      if (status === 200) navigation.navigate('Verify', { email });
    } catch ({ data }) {
      toast.show(data?.message, { placement: 'center', type: 'danger' });
    }
  };

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
  });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', padding: 15, justifyContent: 'center' }}>
      <View style={{ width: '100%', flex: 0.3, justifyContent: 'space-around' }}>
        <H2 style={{ textTransform: 'capitalise', textAlign: 'center' }}>Forgot your password?</H2>
        <H3 style={{ textTransform: 'none', textAlign: 'center' }}>
          We’ll help you reset it and get back on track.
        </H3>
      </View>
      <Formik initialValues={{ email: '' }} validationSchema={SigninSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit: submitHandler, values, errors }) => (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 0.6,
            }}
          >
            <Input
              placeholder='Email'
              placeholderTextColor={colors.gray}
              name='email'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.email}
            />

            <FakeButton
              containerStyle={{ width: '100%' }}
              text='Reset password'
              onPress={submitHandler}
              loading={isLoading}
            />
            <Button
              mode='text'
              labelStyle={{ textTransform: 'capitalize' }}
              compact
              onPress={() => navigation.navigate('Login')}
            >
              Sign in
            </Button>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ForgetPwdScreen;
