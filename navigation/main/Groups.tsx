import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { defaultHeaderOptions } from '../../constants';
import CreateGroupScreen from '../../screens/main/groups/Create';
import JoinGroupScreen from '../../screens/main/groups/Join';
import JoinGroupSuccessScreen from '../../screens/main/groups/JoinSuccess';
import SearchGroup from '../../screens/main/groups/Search';
import ShareGroupScreen from '../../screens/main/groups/Share';

const Stack = createStackNavigator();

function GroupsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group navigationKey='Groups' screenOptions={{ ...defaultHeaderOptions, title: '' }}>
        <Stack.Screen name='CreateGroup' component={CreateGroupScreen} />
        <Stack.Screen name='SearchGroup' component={SearchGroup} />
        <Stack.Screen name='JoinGroup' component={JoinGroupScreen} />
        <Stack.Screen name='ShareGroup' component={ShareGroupScreen} />
        <Stack.Screen name='SuccessGroup' component={JoinGroupSuccessScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default GroupsNavigator;
