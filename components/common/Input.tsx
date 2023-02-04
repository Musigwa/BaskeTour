import React from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePassword } from '../../hooks/useTogglePassword';
import { TextInput } from 'react-native';
import { View, Paragraph } from '../../styles/styled-elements';

interface IntProps {
  bg?: string;
  style?: any;
  borderColor?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  handleChange: Function;
  handleBlur: Function;
  error?: string;
  name: string;
  secureEntry?: boolean;
  autoCorrect?: boolean;
  isPassword?: boolean;
  placeholderTextColor?: string;
}

const Input = ({
  bg,
  style,
  borderColor = '#E9EBED',
  placeholder,
  label,
  handleChange,
  handleBlur,
  error,
  name,
  secureEntry = false,
  placeholderTextColor = 'gray',
  required,
  autoCorrect = false,
  isPassword = false,
}: IntProps) => {
  const { rightIcon, passwordVisibility, handlePasswordVisibility } = useTogglePassword();
  return (
    <View w-100>
      {label ? <Label>{label}</Label> : null}
      {isPassword ? (
        <Wrapper borderColor={borderColor} bg={bg} style={style}>
          <TextInput
            secureTextEntry={passwordVisibility}
            autoCapitalize='none'
            placeholder={placeholder}
            onBlur={handleBlur(name)}
            onChangeText={handleChange(name)}
            autoCorrect={autoCorrect}
            style={{ fontSize: 16, flex: 1, width: '100%' }}
            placeholderTextColor={placeholderTextColor}
          />
          <PasswordIcon onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={18} color='black' />
          </PasswordIcon>
        </Wrapper>
      ) : (
        <Wrapper borderColor={borderColor} bg={bg} style={style}>
          <TextInput
            secureTextEntry={secureEntry}
            autoCapitalize='none'
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onBlur={handleBlur(name)}
            onChangeText={handleChange(name)}
            autoCorrect={autoCorrect}
            style={{ fontSize: 16, flex: 1, width: '100%' }}
          />
        </Wrapper>
      )}
      {error ? <Error>{error}</Error> : null}
    </View>
  );
};

const Wrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  border-color: ${props => props.borderColor};
  border-bottom-width: 1px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 38px;
  background-color: ${props => (props.bg ? props.bg : 'white')};
`;

const Label = styled(Paragraph)`
  color: #8d8d8d;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Error = styled(Paragraph)`
  color: red;
  margin-top: 5px;
  font-size: 10px;
`;

const PasswordIcon = styled.Pressable``;

export default Input;
