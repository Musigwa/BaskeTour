import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import { useAppSelector } from '../../hooks/useStore';

import Constants from 'expo-constants';
import IndicatorHeader from '../../components/Indicator';
import FakeButton from '../../components/common/Buttons';
import Input from '../../components/common/Input';

import { useSignupMutation } from '../../store/api-queries/auth-queries';

import { useTheme } from '@react-navigation/native';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { H5, Horizontal, Paragraph } from '../../styles/styled-elements';
import { AuthScreenProps } from '../../types';
import { openBrowser } from '../../utils/methods';

function SignUpScreen({ navigation }: AuthScreenProps<'SignUp'>) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { token, user } = useAppSelector(state => state.auth);

  // mutations
  const [signUp, { isLoading, error, isError }] = useSignupMutation();

  const toast = useToast();
  useEffect(() => {
    if (isError) {
      let { message } = error?.data;
      if (error.data.errors) message = JSON.stringify(error.data.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, error]);

  const SignUpScreenSchema = Yup.object().shape({
    email: Yup.string().email().required('Field is required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Field is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
        'Password must contain a lowercase, an uppercase, a number and a special character'
      ),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  useEffect(() => {
    if (token && !user.profilePic) {
      navigation.navigate('Photo');
    }
  }, [token, user]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-around',
      }}
    >
      <IndicatorHeader count={2} currentStep={1} />
      <Title>Create Account</Title>

      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={SignUpScreenSchema}
        onSubmit={async values => {
          try {
            console.log('values', values);
            const res = await signUp({
              email: values.email,
              password: values.password,
            }).unwrap();
            if (res.status === 201) {
              navigation.navigate('Photo');
            } else {
              Alert.alert('Something went wrong');
            }
          } catch (error) {
            console.log('error', error);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 0.85,
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
              placeholder='Create password'
              placeholderTextColor={colors.gray}
              name='password'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.password}
              secureEntry
              isPassword
            />
            <Input
              placeholder='Confirm password'
              placeholderTextColor={colors.gray}
              name='confirmPassword'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.confirmPassword}
              secureEntry
              isPassword
            />
            <View style={{ width: '100%', flex: 0.5, justifyContent: 'space-between' }}>
              <PasswordInfo size={16}>Password Requirements</PasswordInfo>
              <Horizontal style={{ justifyContent: 'flex-start' }}>
                <MaterialCommunityIcons name='check' size={18} color='#8d8d8d' />
                <PasswordInfo size={13} ml={10}>
                  Uppercase letter, lowercase letter
                </PasswordInfo>
              </Horizontal>

              <Horizontal style={{ justifyContent: 'flex-start' }}>
                <MaterialCommunityIcons name='check' size={18} color='#8d8d8d' />
                <PasswordInfo size={13} ml={10}>
                  One number
                </PasswordInfo>
              </Horizontal>

              <Horizontal style={{ justifyContent: 'flex-start' }}>
                <MaterialCommunityIcons name='check' size={18} color='#8d8d8d' />
                <PasswordInfo size={13} ml={10}>
                  8-16 characters
                </PasswordInfo>
              </Horizontal>
            </View>

            <FakeButton
              containerStyle={{ width: '100%' }}
              text='Create Account'
              onPress={handleSubmit}
              loading={isLoading}
            />
          </View>
        )}
      </Formik>
      <Horizontal style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        <H5 style={{ textTransform: 'none' }}>
          By using {Constants.expoConfig?.name} you agree to our
        </H5>
        <Button mode='text' compact onPress={() => openBrowser()}>
          Terms & Conditions
        </Button>
      </Horizontal>
    </SafeAreaView>
  );
}

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: 700;
`;

const PasswordInfo = styled(Paragraph)`
  color: #8d8d8d;
`;

export default SignUpScreen;
