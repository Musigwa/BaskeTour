import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { H4, H5, H6, Separator } from '../../../styles/styled-elements';
import { useTheme } from '@react-navigation/native';
import { useAppSelector } from '../../../hooks/useStore';
import KeyboardAvoid from '../../../components/common/KeyboardAvoid';
import { useUploadProfileDetailsMutation } from '../../../store/api-queries/auth-queries';
import _ from 'lodash';
import { useToast } from 'react-native-toast-notifications';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const toast = useToast();
  const { user } = useAppSelector(state => state.auth);
  const [uploadDetails, { isLoading }] = useUploadProfileDetailsMutation();
  const [newUser, setNewUser] = useState({});
  const selectable = ['email', 'firstName', 'lastName'];
  const newProfile = _.pick(newUser, selectable);
  const prevProfile = _.pick(user, selectable);

  const disabled = _.isEqual(newProfile, prevProfile) || isLoading;

  const handleUpload = async () => {
    const { status } = await uploadDetails({ ...prevProfile, ...newProfile }).unwrap();
    if (status === 200) {
      toast.show('Profile updated successfully!', {
        type: 'success',
        placement: 'center',
        animationType: 'zoom-in',
      });
    }
  };

  const handleInputChange = args => {
    setNewUser(state => ({ ...state, ...args }));
  };

  return (
    <KeyboardAvoid
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flex: 0.65, justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: user?.profilePic }}
            style={{
              backgroundColor: 'blue',
              width: 96,
              height: 96,
              borderRadius: 48,
              marginRight: 15,
            }}
            resizeMode='stretch'
          />
          <H5 style={{ color: colors.primary }}>Edit photo</H5>
        </TouchableOpacity>
        <View style={{ flex: 0.2, justifyContent: 'space-evenly' }}>
          <H6 style={{ color: 'rgba(144, 160, 175, 1)' }}>First Name</H6>
          <TextInput
            defaultValue={user?.firstName}
            underlineColorAndroid='transparent'
            onChangeText={firstName => handleInputChange({ firstName })}
          />
          <Separator size='sm' />
        </View>
        <View style={{ flex: 0.2, justifyContent: 'space-evenly' }}>
          <H6 style={{ color: 'rgba(144, 160, 175, 1)' }}>Last Name</H6>
          <TextInput
            defaultValue={user?.lastName}
            underlineColorAndroid='transparent'
            onChangeText={lastName => handleInputChange({ lastName })}
          />
          <Separator size='sm' />
        </View>
        <View style={{ flex: 0.2, justifyContent: 'space-evenly' }}>
          <H6 style={{ color: 'rgba(144, 160, 175, 1)' }}>Email</H6>
          <TextInput
            defaultValue={user?.email}
            underlineColorAndroid='transparent'
            keyboardType='email-address'
            autoCorrect
            editable={false}
            onChangeText={email => handleInputChange({ email })}
          />
          <Separator size='sm' />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: disabled ? 'whitesmoke' : colors.primary,
          paddingVertical: 17,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 6,
        }}
        activeOpacity={0.9}
        disabled={disabled}
        onPress={handleUpload}
      >
        {isLoading ? (
          <ActivityIndicator color={disabled ? 'black' : 'white'} size='small' />
        ) : (
          <H4 style={{ color: disabled ? 'black' : 'white' }}>Save</H4>
        )}
      </TouchableOpacity>
    </KeyboardAvoid>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
