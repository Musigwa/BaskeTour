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

import { Alert, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import KeyboardAvoid from '../../components/common/containers/KeyboardAvoid';
import { hasLoggedIn } from '../../store/slices/authSlice';
import { H2, Paragraph } from '../../styles/styled-elements';

function PhotoScreen() {
  const [photo, setPhoto] = useState<any>();
  const dispatch = useAppDispatch();
  const [uploadDetails, { isLoading, error, isError }] = useUploadProfileDetailsMutation();
  const { colors } = useTheme();
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
    <KeyboardAvoid
      contentContainerStyle={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}
    >
      <IndicatorHeader count={2} currentStep={2} />
      <H2>Profile photo</H2>
      <View style={{ alignItems: 'center' }}>
        <PhotoUploader onSelect={onImageSelect} imageUrl={photo} />
        <Paragraph color='#4F1473' style={{}}>
          Add photo
        </Paragraph>
      </View>
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
          <View
            style={{
              flex: 0.9,
              justifyContent: 'space-around',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                justifyContent: 'space-around',
                flex: 0.5,
                paddingHorizontal: 20,
                alignItems: 'center',
              }}
            >
              <Input
                placeholder='First name'
                placeholderTextColor={colors.gray}
                name='firstName'
                required
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.firstName}
              />
              <Input
                placeholder='Last name'
                placeholderTextColor={colors.gray}
                name='lastName'
                required
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={errors.lastName}
                style={{ marginTop: 15 }}
              />
            </View>
            <Button text='Next' onPress={() => handleSubmit()} loading={isLoading} />
          </View>
        )}
      </Formik>
    </KeyboardAvoid>
  );
}

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: 700;
`;

export default PhotoScreen;
