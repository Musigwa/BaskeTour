import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, TextInput, TouchableOpacity, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import PhotoUploader from '../../../components/PhotoUploader';
import KeyboardAvoid from '../../../components/common/KeyboardAvoid';
import { useAppSelector } from '../../../hooks/useStore';
import { useUploadProfileDetailsMutation } from '../../../store/api-queries/auth-queries';
import { H4, H5, H6, Horizontal, Separator } from '../../../styles/styled-elements';
import { createFormData, objDiff } from '../../../utils/methods';

const ProfileScreen = () => {
  const { colors } = useTheme();
  const toast = useToast();
  const { user } = useAppSelector(state => state.auth);
  const [uploadDetails, { isLoading }] = useUploadProfileDetailsMutation();
  const [newUser, setNewUser] = useState(user);

  const selectable = ['email', 'firstName', 'lastName', 'profilePic'];
  const newProfile = _.pick(newUser, selectable);
  const prevProfile = _.pick(user, selectable);

  const disabled = _.isEqual(newProfile, prevProfile) || isLoading;

  const handleUpload = async () => {
    const difference = objDiff(user, newUser);
    const data = difference?.photo
      ? createFormData(difference?.photo, _.omit(difference, ['profilePic', 'photo']))
      : difference;
    const { status } = await uploadDetails(data).unwrap();
    if (status === 200) {
      setNewUser(user);
      const message = 'Profile updated successfully!';
      toast.show(message, { type: 'success', placement: 'center', animationType: 'zoom-in' });
    }
  };

  const handleInputChange = args => {
    setNewUser(state => ({ ...state, ...args }));
  };

  const cancelPhoto = () => {
    setNewUser(state => ({ ..._.omit(state, ['photo']), profilePic: user.profilePic }));
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
        <Horizontal style={{ justifyContent: 'flex-start' }}>
          <PhotoUploader
            imageUrl={newUser.profilePic}
            onSelect={result => handleInputChange({ profilePic: result.uri, photo: result })}
            style={{ width: 96, height: 96, borderRadius: 48, marginRight: 15 }}
          />
          <Pressable onPress={newUser.photo ? cancelPhoto : null}>
            <H5 style={{ color: colors.primary }}>{newUser.photo ? 'Discard' : 'Edit photo'}</H5>
          </Pressable>
        </Horizontal>
        <View style={{ flex: 0.2, justifyContent: 'space-evenly' }}>
          <H6 style={{ color: colors.gray }}>First Name</H6>
          <TextInput
            defaultValue={user?.firstName}
            underlineColorAndroid='transparent'
            onChangeText={firstName => handleInputChange({ firstName })}
          />
          <Separator size='sm' />
        </View>
        <View style={{ flex: 0.2, justifyContent: 'space-evenly' }}>
          <H6 style={{ color: colors.gray }}>Last Name</H6>
          <TextInput
            defaultValue={user?.lastName}
            underlineColorAndroid='transparent'
            onChangeText={lastName => handleInputChange({ lastName })}
          />
          <Separator size='sm' />
        </View>
        <View style={{ flex: 0.2, justifyContent: 'space-evenly' }}>
          <H6 style={{ color: colors.gray }}>Email</H6>
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
          backgroundColor: disabled ? colors.disabled : colors.primary,
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
