import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import { SafeAreaView } from 'react-native-safe-area-context';

import FakeButton from '../../components/common/Buttons';
import Input from '../../components/common/Input';

import { View } from 'react-native';
import { H2, H3 } from '../../styles/styled-elements';

import { useTheme } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import { useAppDispatch } from '../../hooks/useStore';
import { useLoginMutation } from '../../store/api-queries/auth-queries';
import { hasLoggedIn } from '../../store/slices/authSlice';

const VerifyScreen = ({ navigation }) => {
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
    <SafeAreaView style={{ flex: 1, alignItems: 'center', padding: 15 }}>
      <View
        style={{ width: '100%', flex: 0.3, justifyContent: 'space-around', alignItems: 'center' }}
      >
        <H2 style={{ textAlign: 'center' }}>Password reset</H2>
        <H3 style={{ textTransform: 'none' }}>We'll email you a verification code</H3>
      </View>
      <Formik initialValues={{ email: '' }} validationSchema={SigninSchema} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit: submitHandler, values, errors }) => (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              flex: 0.4,
            }}
          >
            <Input
              placeholder='Verification code'
              placeholderTextColor={colors.gray}
              name='email'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.email}
            />

            <FakeButton
              containerStyle={{ width: '100%' }}
              text='Next'
              onPress={() => navigation.navigate('Reset')}
              loading={isLoading}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default VerifyScreen;
