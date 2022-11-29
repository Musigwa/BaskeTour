import React, { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useStore';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';

import IndicatorHeader from '../../components/Indicator';
import Input from '../../components/common/Input';
import Button from '../../components/common/Buttons';

import { useSignupMutation } from '../../store/api-queries/auth-queries';

import { AuthScreenProps } from '../../types';
import { Paragraph, View } from '../../styles/styled-elements';
import { Alert, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

function SignUpScreen({ navigation }: AuthScreenProps<'SignUp'>) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { token, user } = useAppSelector(state => state.auth);

  // mutations
  const [signUp, { isLoading }] = useSignupMutation();

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
    <Container>
      <IndicatorHeader
        // showBackIcon={true}
        count={2}
        currentStep={1}
        // handleBackPress={() => navigation.goBack()}
      />
      <View items-center w-100 mt={40} mb={50}>
        <Title>Create Account</Title>
      </View>

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
            <View w-100 mb={45}>
              <Input
                placeholder='Create password'
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

            <View w-100 mb={34}>
              <Input
                placeholder='Confirm password'
                // label='Confirm Password'
                name='confirmPassword'
                required
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.confirmPassword}
                secureEntry
                isPassword
              />
            </View>

            <View>
              <PasswordInfo size={16}>Password Requirements</PasswordInfo>
              <View mt={23} flex-row items-center>
                <MaterialCommunityIcons name='check' size={18} color='#8d8d8d' />
                <PasswordInfo size={13} ml={10}>
                  Uppercase letter, lowercase letter
                </PasswordInfo>
              </View>

              <View mt={23} flex-row items-center>
                <MaterialCommunityIcons name='check' size={18} color='#8d8d8d' />
                <PasswordInfo size={13} ml={10}>
                  One number
                </PasswordInfo>
              </View>

              <View mt={23} flex-row items-center>
                <MaterialCommunityIcons name='check' size={18} color='#8d8d8d' />
                <PasswordInfo size={13} ml={10}>
                  8-16 characters
                </PasswordInfo>
              </View>
            </View>

            <View mt={50} w-100 items-center>
              <Button text='Create Account' onPress={handleSubmit} loading={isLoading} />
              <BottomText>
                <Paragraph>By using Ulli you agree to our </Paragraph>
                <Pressable>
                  <Terms style={{ color: colors.primary }}>Terms & Conditions</Terms>
                </Pressable>
              </BottomText>
            </View>
          </>
        )}
      </Formik>
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

export default SignUpScreen;
