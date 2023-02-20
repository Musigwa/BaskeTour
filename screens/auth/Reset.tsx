import { Formik } from 'formik';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';

import FakeButton from '../../components/common/Buttons';
import Input from '../../components/common/Input';

import { View } from 'react-native';
import { H2, H3 } from '../../styles/styled-elements';

import { useTheme } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import { useAppDispatch } from '../../hooks/useStore';
import { useResetPassordMutation } from '../../store/api-queries/auth-queries';
import { hasLoggedIn } from '../../store/slices/authSlice';

const ResetPwdScreen = ({ route }) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [requestPasswordRest, { isLoading }] = useResetPassordMutation();
  const toast = useToast();
  const { email, verificationCode } = route.params;

  const handleSubmit = async ({ password }) => {
    try {
      const { status } = await requestPasswordRest({ email, verificationCode, password }).unwrap();
      if (status === 201) dispatch(hasLoggedIn(true));
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

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', padding: 15 }}>
      <View
        style={{ width: '100%', flex: 0.3, justifyContent: 'space-around', alignItems: 'center' }}
      >
        <H2 style={{ textTransform: 'capitalise' }}>Password reset</H2>
        <H3 style={{ textTransform: 'capitalise' }}>Please enter your new password.</H3>
      </View>
      <Formik
        validationSchema={SigninSchema}
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit: submitHandler, values, errors }) => (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 0.5,
            }}
          >
            <Input
              placeholder='New Password'
              placeholderTextColor={colors.gray}
              name='password'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.password}
              isPassword
              secureEntry
            />
            <Input
              placeholder='Repeat Password'
              placeholderTextColor={colors.gray}
              name='confirmPassword'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.confirmPassword}
              isPassword
              secureEntry
            />

            <FakeButton
              containerStyle={{ width: '100%' }}
              text='Set new password'
              onPress={submitHandler}
              loading={isLoading}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ResetPwdScreen;
