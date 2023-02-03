import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';

import Checkbox from 'expo-checkbox';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FacebookLogo from '../../assets/svgs/FacebookLogo';
import Button from '../../components/common/Buttons';
import Input from '../../components/common/Input';

import { Pressable } from 'react-native';
import { Paragraph, View } from '../../styles/styled-elements';

import { useToast } from 'react-native-toast-notifications';
import { ToastOptions } from 'react-native-toast-notifications/lib/typescript/toast';
import { useAppDispatch } from '../../hooks/useStore';
import { useLoginMutation } from '../../store/api-queries/auth-queries';
import { hasLoggedIn } from '../../store/slices/authSlice';

function LoginScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const [loginUser, { isLoading, data }] = useLoginMutation();
  const toast = useToast();

  const handleGetStarted = () => {
    navigation.push('Photo');
  };

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
    <Container pb={insets.bottom} content-center>
      <StatusBar style='dark' />
      <View w-100>
        <View items-center w-100 mt={20} mb={70}>
          <Title>Sign in to Ulli</Title>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SigninSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <View w-100 mb={45}>
                <Input
                  placeholder='Email'
                  // label='Email'
                  name='email'
                  required
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors.email}
                />
              </View>
              <View w-100 mb={40}>
                <Input
                  placeholder='Password'
                  // label='Password'
                  name='password'
                  required
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors.password}
                  secureEntry
                  isPassword
                />
              </View>

              <View flex-row space-between w-100 items-center>
                <View flex-row items-center>
                  <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                  />
                  <Paragraph ml={10} size={16}>
                    Remember me
                  </Paragraph>
                </View>
                <ForgotPassword size={16}>Forgot password?</ForgotPassword>
              </View>

              <View mt={50} w-100 items-center>
                <Button text='Sign in' onPress={handleSubmit} loading={isLoading} />
                <Paragraph mb={22} mt={22} size={16} color='#8D8D8D'>
                  OR
                </Paragraph>
                {/* <Button
                  text='Sign in with Facebook'
                  onPress={handleGetStarted}
                  bg='#475996'
                  icon={FacebookLogo}
                /> */}
                <BottomText>
                  <Paragraph>By using Ulli you agree to our </Paragraph>
                  <Pressable>
                    <Terms>Terms & Conditions</Terms>
                  </Pressable>
                </BottomText>
              </View>
            </>
          )}
        </Formik>
      </View>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
`;

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: 700;
`;

const PasswordInfo = styled(Paragraph)`
  color: #8d8d8d;
`;

const Terms = styled(Paragraph)`
  color: ${props => props.theme.primary};
  font-weight: bold;
`;

const BottomText = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 37px;
  font-size: 14px;
`;

const ForgotPassword = styled(Paragraph)`
  color: ${props => props.theme.primary};
`;

export default LoginScreen;
