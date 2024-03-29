import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { IntStyleProps } from '../types';

export const Card: React.FC<IntStyleProps> = styled.View`
  flex-direction: ${(props: IntStyleProps) => (props['flex-column'] ? 'column' : 'row')};
  align-items: ${(props: IntStyleProps) =>
    props['items-left'] ? 'flex-start' : props['items-right'] ? 'flex-end' : 'center'};
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  margin-top: ${(props: IntStyleProps) => (props.mt ? props.mt + 'px' : '0px')};
  margin-bottom: ${(props: IntStyleProps) => (props.mb ? props.mb + 'px' : '0px')};
`;

export const Container = styled.View`
  background-color: ${(props: IntStyleProps) => props.theme['background']};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'space-mono';
`;

export const Paragraph: React.FC<any> = styled.Text.attrs((props: any) => ({
  ellipsizeMode: 'tail',
  adjustFonttofit: true,
}))`
  font-weight: 500;
  font-size: ${(props: IntStyleProps) => (props.size ? props.size + 'px' : '12px')};
  font-family: Poppins_500Medium;
  color: ${(props: IntStyleProps) => (props.color ? props.color : props.theme['text'])};
  margin-left: ${(props: IntStyleProps) => (props.ml ? props.ml + 'px' : '0px')};
  margin-right: ${(props: IntStyleProps) => (props.mr ? props.mr + 'px' : '0px')};
  margin-top: ${(props: IntStyleProps) => (props.mt ? props.mt + 'px' : '0px')};
  margin-bottom: ${(props: IntStyleProps) => (props.mb ? props.mb + 'px' : '0px')};
  ${({ style }: IntStyleProps) => (style ? style : null)}
`;

export const View: React.FC<IntStyleProps> = styled.View`
  flex-direction: ${(props: IntStyleProps) => (props['flex-row'] ? 'row' : 'column')};
  align-items: ${(props: IntStyleProps) => (props['items-center'] ? 'center' : 'flex-start')};
  justify-content: ${(props: IntStyleProps) =>
    props['content-center'] ? 'center' : props['space-between'] ? 'space-between' : 'flex-start'};
  background-color: ${(props: IntStyleProps) => (props.bg ? props.bg : 'none')};
  flex: ${(props: IntStyleProps) => (props.flex ? props.flex : 'none')};
  width: ${(props: IntStyleProps) => (props['w-100'] ? '100%' : props['w-50'] ? '50%' : 'auto')};
  margin-left: ${(props: IntStyleProps) => (props.ml ? props.ml + 'px' : '0px')};
  margin-right: ${(props: IntStyleProps) => (props.mr ? props.mr + 'px' : '0px')};
  margin-bottom: ${(props: IntStyleProps) => (props.mb ? props.mb + 'px' : '0px')};
  margin-top: ${(props: IntStyleProps) => (props.mt ? props.mt + 'px' : '0px')};
  padding-left: ${(props: IntStyleProps) => (props.pl ? props.pl + 'px' : '0px')};
  padding-right: ${(props: IntStyleProps) => (props.pr ? props.pr + 'px' : '0px')};
  padding-bottom: ${(props: IntStyleProps) => (props.pb ? props.pb + 'px' : '0px')};
  padding-top: ${(props: IntStyleProps) => (props.pt ? props.pt + 'px' : '0px')};
  ${({ style }: IntStyleProps) => (style ? style : null)};
`;

const StyledScrollView: React.FC<any> = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))``;

export const ScrollContainer = styled(StyledScrollView)`
  background-color: ${props => props.theme.background};
  flex: 1;
  padding: 0 16px;
`;

export const Title = styled(Paragraph)`
  font-size: 24px;
  font-family: Poppins_700Bold;
`;

export const BackButtonWrapper = styled(View)`
  padding: 10px;
`;

export const ErrorMessage = styled(Paragraph)`
  color: #ee3c15;
  text-align: center;
  font-size: 12px;
  font-family: Montserrat_500Medium;
`;

export const Horizontal = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Separator: React.FC<
  IntStyleProps & { size?: 'lg' | 'sm' | 'md' | 'invisible' }
> = styled.View`
  width: 100%;
  border: ${props => {
    let thickness = 0.6;
    switch (props.size) {
      case 'invisible':
        thickness = 0;
        break;
      case 'sm':
        thickness = StyleSheet.hairlineWidth;
        break;
      case 'md':
        thickness = 0.6;
        break;
      case 'lg':
        thickness = 1.5;
        break;
      default:
        thickness = StyleSheet.hairlineWidth;
        break;
    }
    return `${thickness}px solid #e9ebed`;
  }};
`;

export const H2 = styled(Paragraph)`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.165px;
  // text-align: center;
  text-transform: capitalize;
`;

export const H3 = styled(Paragraph)`
  font-size: 18px;
  font-weight: 500;
  // line-height: 18px;
  letter-spacing: -0.165px;
  text-transform: capitalize;
`;

export const H4 = styled(Paragraph)`
  font-size: 16px;
  font-weight: 500;
  // line-height: 18px;
  letter-spacing: -0.165px;
  text-transform: capitalize;
`;

export const H5 = styled(Paragraph)`
  font-size: 14px;
  font-weight: 700;
  // line-height: 20px;
  letter-spacing: 0.8px;
  text-transform: capitalize;
`;

export const H6 = styled(Paragraph)`
  font-size: 12px;
  font-weight: 700;
  // line-height: 20px;
  letter-spacing: 0.8px;
  text-transform: capitalize;
`;

export const ListItem = styled(View)`
  padding: 12px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
