import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import FakeButton from '../../components/common/Buttons';
import Input from '../../components/common/Input';
import { View } from 'react-native';
import { H2, H3 } from '../../styles/styled-elements';
import { useTheme } from 'react-native-paper';

const VerifyScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { email } = route.params;

  const SigninSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .required('Verification code is required')
      .matches(/\d{6}/, 'The verification code must be 6 digits'),
  });

  const handleVerify = values => {
    navigation.navigate('Reset', { ...values, email });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', padding: 15 }}>
      <View
        style={{ width: '100%', flex: 0.3, justifyContent: 'space-around', alignItems: 'center' }}
      >
        <H2 style={{ textAlign: 'center' }}>Password reset</H2>
        <H3 style={{ textTransform: 'none' }}>We'll email you a verification code</H3>
      </View>
      <Formik
        initialValues={{ verificationCode: '' }}
        validationSchema={SigninSchema}
        onSubmit={handleVerify}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
              name='verificationCode'
              required
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.verificationCode}
            />

            <FakeButton containerStyle={{ width: '100%' }} text='Next' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default VerifyScreen;
