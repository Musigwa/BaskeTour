import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import styled from 'styled-components/native';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  onSelect: Function;
  style?: ViewStyle;
  imageUrl?: string;
}

const PhotoUploader = ({ onSelect, style, imageUrl }: Props) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) onSelect(result);
  };

  return (
    <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
      <Wrapper style={style} source={{ uri: imageUrl }}>
        {!imageUrl ? (
          <MaterialIcons
            name='add-a-photo'
            size={(typeof style?.width === 'number' && style.width / 3) || 54}
            color='#4F1473'
          />
        ) : null}
      </Wrapper>
    </TouchableOpacity>
  );
};

const Wrapper = styled.ImageBackground`
  justify-content: center;
  align-items: center;
  width: 162px;
  height: 162px;
  border-radius: 100%;
  background-color: #e5e3ee;
  overflow: hidden;
`;

export default PhotoUploader;
