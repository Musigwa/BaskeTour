import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import Checkbox from 'expo-checkbox';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';

import FakeButton from '../../components/common/Buttons';
import Input from '../../components/common/Input';

import { View } from 'react-native';
import { H2, H5, Horizontal } from '../../styles/styled-elements';

import { Button, useTheme } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import { useAppDispatch } from '../../hooks/useStore';
import { useLoginMutation } from '../../store/queries/auth';
import { hasLoggedIn } from '../../store/slices/auth';
import { openBrowser } from '../../utils/methods';

const LoginScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [loginUser, { isLoading, data }] = useLoginMutation();
  const toast = useToast();

  const handleSubmit = async ({ email: accountIdentifier, password }) => {
    try {
      const res = await loginUser({ accountIdentifier, password }).unwrap();
      if (res.status === 200) dispatch(hasLoggedIn(true));
      else throw new Error(res);
    } catch ({ data }) {
      const options: ToastOptions = {
        type: 'danger',
        placement: 'center',
        animationType: 'zoom-in',
      };
      toast.show(data?.message, options);
    }
  };

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email().required('Field is required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Field is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
        'Password must contain a lowercase, an uppercase, a number and a special character'
      ),
  });

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', padding: 15, justifyContent: 'space-around' }}
    >
      <H2 style={{ textTransform: 'capitalise' }}>Sign in to {Constants?.expoConfig?.name}</H2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SigninSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit: submitHandler, values, errors }) => (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
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
            <Input
              placeholder='Password'
              placeholderTextColor={colors.gray}
              name='password'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.password}
              secureEntry
              isPassword
              style={{ marginVertical: 20 }}
            />
            <Horizontal style={{ width: '100%' }}>
              <Horizontal>
                <Checkbox
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? '#4630EB' : undefined}
                />
                <H5 style={{ textTransform: 'none', marginLeft: 5 }}>Remember me</H5>
              </Horizontal>
              <Button
                mode='text'
                labelStyle={{ textTransform: 'none' }}
                compact
                onPress={() => navigation.navigate('Forget')}
              >
                Forgot password?
              </Button>
            </Horizontal>
            <FakeButton
              containerStyle={{ width: '100%' }}
              text='Sign in'
              onPress={submitHandler}
              loading={isLoading}
            />
          </View>
        )}
      </Formik>
      <Horizontal style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <H5 style={{ textTransform: 'none' }}>
          By using {Constants.expoConfig?.name} you agree to our
        </H5>
        <Button
          mode='text'
          labelStyle={{ textTransform: 'none' }}
          compact
          onPress={() => openBrowser()}
        >
          Terms & Conditions
        </Button>
      </Horizontal>
    </SafeAreaView>
  );
};

export default LoginScreen;
