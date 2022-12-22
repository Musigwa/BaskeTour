import React, { useEffect } from 'react';
import {
  ImageBackground,
  View as RNView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BallIcon from '../../../assets/svgs/BallIcon';
import HoopIcon from '../../../assets/svgs/HoopIcon';
import Logo from '../../../assets/svgs/Logo';

import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { useGetTournamentsQuery } from '../../../store/api-queries/tournaments';
import { H3, H4 } from '../../../styles/styled-elements';

const SetupTypeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { bottom: paddingBottom, top: paddingTop } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  useGetTournamentsQuery();
  const { colors } = useTheme();
  const { params } = route;

  useEffect(() => {
    if (params?.group) {
      const { group } = params;
      navigation.navigate('JoinGroup', { group });
    }
  }, [params?.group]);

  const handleNext = (routeName, params = {}) => {
    navigation.navigate(routeName, params);
  };

  return (
    <ImageBackground
      source={require(' ../../../assets/images/bg_main.png')}
      style={[style.container, { width, paddingBottom, paddingTop }]}
    >
      <StatusBar barStyle='light-content' />
      <Logo />
      <RNView style={style.btnContainer}>
        <TouchableOpacity
          onPress={() => handleNext('CreateGroup')}
          style={[style.button, { backgroundColor: '#4833B5' }]}
        >
          <BallIcon />
          <H3 style={{ color: 'white' }}>Create New Group</H3>
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.button, { backgroundColor: '#9C49CF' }]}
          onPress={() => handleNext('SearchGroup', { btnText: 'Join Group' })}
        >
          <HoopIcon />
          <H3 style={{ color: 'white' }}>Join Existing Group</H3>
        </TouchableOpacity>
      </RNView>

      <TouchableOpacity onPress={() => handleNext('Tabs')}>
        <H4 style={{ color: colors.primary }}>Skip For Now</H4>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btnContainer: {
    flex: 0.4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '85%',
  },
  button: {
    borderRadius: 5,
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});

export default SetupTypeScreen;
