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
import { useUpdatePasswordMutation } from '../../store/api-queries/auth-queries';
import { hasLoggedIn } from '../../store/slices/authSlice';

const UpdatePwdScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const [requestPasswordUpdate, { isLoading }] = useUpdatePasswordMutation();
  const toast = useToast();

  const handleSubmit = async ({ password, newPassword }) => {
    try {
      const { status } = await requestPasswordUpdate({ newPassword, password }).unwrap();
      if (status === 201) navigation.goBack();
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
    newPassword: Yup.string()
      .required()
      .notOneOf([Yup.ref('password'), null], 'Passwords must be different'),
  });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', padding: 15 }}>
      <View
        style={{ width: '100%', flex: 0.3, justifyContent: 'space-around', alignItems: 'center' }}
      >
        <H2 style={{ textTransform: 'capitalise' }}>Password Update</H2>
        <H3 style={{ textTransform: 'capitalise' }}>Please enter your old and new passwords.</H3>
      </View>
      <Formik
        validationSchema={SigninSchema}
        initialValues={{ password: '', newPassword: '' }}
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
              placeholder='Old Password'
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
              placeholder='New Password'
              placeholderTextColor={colors.gray}
              name='newPassword'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.newPassword}
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

export default UpdatePwdScreen;
