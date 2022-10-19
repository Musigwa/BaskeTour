import React, { useState } from "react";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CameraIcon from "../assets/svgs/CameraIcon";

import { Paragraph, View } from "../styles/styled-elements";
import { TouchableOpacity } from "react-native";

interface Props {
  onSelect: Function;
}

const PhotoUploader = ({ onSelect }: Props) => {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      onSelect(result);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Wrapper source={{ uri: image }}>
        {!image ? <CameraIcon /> : null}
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
