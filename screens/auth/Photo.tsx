import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import { createFormData } from '../../utils/methods';
import * as Yup from 'yup';

import { useAppSelector } from '../../hooks/useStore';
import { useUploadProfileDetailsMutation } from '../../store/api-queries/auth-queries';

import IndicatorHeader from '../../components/Indicator';
import PhotoUploader from '../../components/PhotoUploader';
import Input from '../../components/common/Input';
import Button from '../../components/common/Buttons';

import { AuthScreenProps } from '../../types';

import { Paragraph, View } from '../../styles/styled-elements';
import { Alert, SafeAreaView } from 'react-native';

function PhotoScreen({ navigation }: AuthScreenProps<'Photo'>) {
  const [photo, setPhoto] = useState<any>();
  const insets = useSafeAreaInsets();

  const { token, user, completedOnboarding } = useAppSelector(state => state.auth);

  const [uploadDetails, { isLoading }] = useUploadProfileDetailsMutation();

  const handleGetStarted = () => {
    navigation.push('Onboarding');
  };

  const onImageSelect = (image: any) => {
    setPhoto(image);
  };

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short').required('Field is required'),
    lastName: Yup.string().min(2, 'Too Short').required('Field is required'),
  });

  useEffect(() => {
    if (token && user.profilePic && !completedOnboarding) {
      navigation.push('Onboarding');
    }
  }, [token, user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <IndicatorHeader
          // showBackIcon={true}
          count={2}
          currentStep={2}
          // handleBackPress={() => navigation.goBack()}
        />
        <View items-center w-100 mt={50} mb={70}>
          <Title>Profile photo</Title>
        </View>

        <View w-100 items-center>
          <PhotoUploader onSelect={onImageSelect} />
          <Paragraph mt={18} color='#4F1473'>
            Add photo
          </Paragraph>
        </View>

        <View mt={50} w-100>
          <Formik
            initialValues={{ firstName: '', lastName: '' }}
            validationSchema={ProfileSchema}
            onSubmit={async values => {
              try {
                if (!photo) {
                  Alert.alert('Please upload a photo');
                  return;
                }
                console.log('values', values);
                const data = createFormData(photo, values);
                console.log('values', data);

                const res = await uploadDetails(data).unwrap();
                console.log('res---', res);
                if (res.status === 200) {
                  navigation.navigate('Boarding');
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
                <View w-100 mb={34}>
                  <Input
                    placeholder='First name'
                    // label='First name'
                    name='firstName'
                    required
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors.firstName}
                  />
                </View>
                <View w-100 mb={34}>
                  <Input
                    placeholder='Last name'
                    // label='Last name'
                    name='lastName'
                    required
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors.lastName}
                  />
                </View>
                <View mt={50} w-100 items-center>
                  <Button text='Next' onPress={handleSubmit} loading={isLoading} />
                </View>
              </>
            )}
          </Formik>
        </View>
      </Container>
    </SafeAreaView>
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

export default PhotoScreen;
