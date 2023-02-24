import React, { useEffect } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import Logo from '../../assets/svgs/Logo';
import Button from '../../components/common/Buttons';
import { useAppSelector } from '../../hooks/useStore';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { H3 } from '../../styles/styled-elements';

const InitialScreen = () => {
  const navigation = useNavigation();
  const { token, user } = useAppSelector(state => state.auth);
  const { colors } = useTheme();
  const handleGetStarted = () => {
    navigation.navigate('SignUp');
  };

  const handleSignin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (token && !user?.profilePic) navigation.navigate('Photo');
  }, [token, user]);

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/bg_main.png')}
        resizeMode='cover'
        style={{ justifyContent: 'space-around', flex: 1, alignItems: 'center' }}
      >
        <Logo />
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 0.2,
            width: '100%',
          }}
        >
          <Button text='Get Started' onPress={handleGetStarted} />
          <TouchableOpacity onPress={handleSignin}>
            <H3 style={{ color: colors.primary }}>Sign in</H3>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default InitialScreen;
