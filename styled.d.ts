import "styled-components";
interface IPalette {
  main: string;
  contrastText: string;
}

interface ICommon {
  borderRadius: number;
  containerPadding: number;
  lightGray: string;
  danger: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    primaryHighlight: string;
    secondary: string;
    title: string;
    text: string;
    background: string;
    danger: string;
    common: ICommon;
    accentBlue: string;
    accentPurple: string
  }
}
