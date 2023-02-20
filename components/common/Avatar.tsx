import React from 'react';
import { Avatar } from 'react-native-paper';

const RenderAvatar = ({ uri, size = 50, label = 'IN' }) => {
  return uri ? (
    <Avatar.Image size={size} source={{ uri }} />
  ) : (
    <Avatar.Text size={size} label={label} labelStyle={{ fontSize: 18 }} />
  );
};

export default RenderAvatar;
