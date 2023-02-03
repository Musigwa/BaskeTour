import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Yup from 'yup';
import { createFormData } from '../../utils/methods';

import { useAppDispatch } from '../../hooks/useStore';
import { useUploadProfileDetailsMutation } from '../../store/api-queries/auth-queries';

import IndicatorHeader from '../../components/Indicator';
import PhotoUploader from '../../components/PhotoUploader';
import Button from '../../components/common/Buttons';
import Input from '../../components/common/Input';

import { Alert, SafeAreaView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import KeyboardAvoid from '../../components/common/containers/KeyboardAvoid';
import { hasLoggedIn } from '../../store/slices/authSlice';
import { Paragraph, View } from '../../styles/styled-elements';

function PhotoScreen() {
  const [photo, setPhoto] = useState<any>();
  const dispatch = useAppDispatch();
  const [uploadDetails, { isLoading, error, isError }] = useUploadProfileDetailsMutation();

  const onImageSelect = (image: any) => {
    setPhoto(image);
  };

  const toast = useToast();
  useEffect(() => {
    if (isError) {
      let { message } = error?.data;
      if (error.data.errors) message = JSON.stringify(error.data.errors);
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, error]);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short').required('Field is required'),
    lastName: Yup.string().min(2, 'Too Short').required('Field is required'),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoid contentContainerStyle={{ paddingHorizontal: 20 }}>
        <IndicatorHeader
          // showBackIcon={true}
          count={2}
          currentStep={2}
          // handleBackPress={() => navigation.goBack()}
        />
        <View items-center w-100 mb={20} mt={20}>
          <Title>Profile photo</Title>
        </View>

        <View w-100 items-center>
          <PhotoUploader onSelect={onImageSelect} imageUrl={photo} />
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
                if (res.status === 200) dispatch(hasLoggedIn(true));
                else Alert.alert('Something went wrong');
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
      </KeyboardAvoid>
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
