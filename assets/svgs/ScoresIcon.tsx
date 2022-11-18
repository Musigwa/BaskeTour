import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";

const ScoresIcon = (props: SvgProps) => (
  <Svg
    width={26}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={12} height={22} rx={1} fill={props.color || "#FF755B"} />
    <Rect
      x={14}
      width={12}
      height={22}
      rx={1}
      fill={props.color || "#FF755B"}
    />
    <Path
      d="m5.156 9.072-1.031.1V7.777c.18-.078.355-.16.527-.246a2.93 2.93 0 0 0 .498-.322l.006 1.863Zm.282-1.998c.09-.066.166-.14.228-.222a2.66 2.66 0 0 0 .193-.3h1.348V17H5.443l-.005-9.926ZM20.14 8.117h-2.32V6.56h2.649l-.328 1.558Zm.628-1.558h1.453v.966L20.14 17h-1.6l2.227-10.441Z"
      fill="#fff"
    />
  </Svg>
);

export default ScoresIcon;
