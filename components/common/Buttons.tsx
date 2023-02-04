import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Paragraph, View } from '../../styles/styled-elements';

interface IProps {
  text?: string;
  textSize?: number;
  textColor?: string;
  bg?: string;
  onPress?: Function;
  containerStyle?: any;
  loading?: boolean;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  small?: boolean;
  disabled?: boolean;
  icon?: Function;
}

const Button = ({
  text,
  textSize,
  bg,
  textColor,
  containerStyle = { width: '90%' },
  small,
  onPress = () => {},
  loading = false,
  disabled = false,
  icon: Icon,
  ...rest
}: IProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={() => onPress()}
      disabled={loading || disabled}
    >
      <Wrapper
        bg={bg ?? colors.primary}
        {...rest}
        disabled={loading || disabled}
        small={small}
        content-center
      >
        <IconWrapper>{Icon ? <Icon /> : null}</IconWrapper>

        {!loading ? (
          <Text size={textSize} color={textColor}>
            {text || 'Button Text'}
          </Text>
        ) : (
          <ActivityIndicator size='small' color='white' />
        )}
      </Wrapper>
    </TouchableOpacity>
  );
};

const IconWrapper = styled(View)`
  position: absolute;
  left: 16px;
`;

const Wrapper = styled(View)<{
  bg?: string;
  loading?: boolean;
  disabled?: boolean;
  small?: boolean;
}>`
  position: relative;
  flex-direction: row;
  justify-content: center;
  background-color: ${props =>
    props.bg ? props.bg : props.disabled ? props.theme.secondary : props.theme.primary};
  padding: ${props => (props.small ? '2px 2px' : '2px 5px')};
  height: 58px;
  border-radius: 6px;
  opacity: ${props => (props.loading ? 0.4 : 1)};
  width: 100%;
  align-items: center;
`;

const Text = styled(Paragraph)<{ color: string; size: string }>`
  color: ${props => (props.color ? props.color : 'white')};
  font-size: ${props => (props.size ? props.size + 'px' : '18px')};
  font-weight: bold;
`;

export default Button;
