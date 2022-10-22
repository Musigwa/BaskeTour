import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const WarningIcon = (props: SvgProps) => (
  <Svg width={140} height={140} viewBox="0 0 140 140" fill="none" {...props}>
    <Path
      d="M97.296 140H42.704a4.1 4.1 0 01-2.9-1.201L1.201 100.196A4.1 4.1 0 010 97.296V42.704a4.1 4.1 0 011.201-2.9L39.804 1.2A4.1 4.1 0 0142.704 0h54.592a4.1 4.1 0 012.9 1.201l38.603 38.603a4.102 4.102 0 011.201 2.9v54.592c0 1.088-.432 2.13-1.201 2.9l-38.602 38.603a4.104 4.104 0 01-2.9 1.201z"
      fill="url(#paint0_linear_0_1)"
    />
    <Path
      d="M70 82.305c-6.785 0-12.305-5.52-12.305-12.305V37.187c0-6.784 5.52-12.304 12.305-12.304s12.305 5.52 12.305 12.305V70c0 6.785-5.52 12.305-12.305 12.305z"
      fill="url(#paint1_linear_0_1)"
    />
    <Path
      d="M70 115.117c-6.785 0-12.305-5.52-12.305-12.305 0-6.784 5.52-12.304 12.305-12.304s12.305 5.52 12.305 12.304c0 6.785-5.52 12.305-12.305 12.305z"
      fill="url(#paint2_linear_0_1)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_0_1"
        x1={70}
        y1={140}
        x2={70}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FD3A84" />
        <Stop offset={1} stopColor="#FFA68D" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_0_1"
        x1={70}
        y1={82.3047}
        x2={70}
        y2={24.8828}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFC2CC" />
        <Stop offset={1} stopColor="#FFF2F4" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_0_1"
        x1={70}
        y1={115.117}
        x2={70}
        y2={90.5078}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFC2CC" />
        <Stop offset={1} stopColor="#FFF2F4" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default WarningIcon;
