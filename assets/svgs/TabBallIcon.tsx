import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

const TabBallIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill={props.color}>
      <Path d="M16.063 3.45a7.88 7.88 0 0 0-2.255 5.023H18a8.938 8.938 0 0 0-1.937-5.022ZM9.527 0v8.473h3.226a8.934 8.934 0 0 1 2.61-5.817C13.858 1.154 11.784.132 9.527 0ZM13.808 9.527a7.97 7.97 0 0 0 2.255 5.057A9.046 9.046 0 0 0 18 9.527h-4.192ZM2.637 2.656a8.935 8.935 0 0 1 2.61 5.817h3.226V0c-2.257.132-4.33 1.154-5.836 2.656ZM12.753 9.527H9.527V18a9.051 9.051 0 0 0 5.836-2.621 9.023 9.023 0 0 1-2.61-5.852ZM5.247 9.527a9.023 9.023 0 0 1-2.61 5.852A9.05 9.05 0 0 0 8.473 18V9.527H5.247ZM0 9.527c.11 1.89.83 3.659 1.937 5.057a7.971 7.971 0 0 0 2.255-5.057H0ZM1.937 3.45A8.938 8.938 0 0 0 0 8.474h4.192A7.88 7.88 0 0 0 1.937 3.45Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default TabBallIcon;
