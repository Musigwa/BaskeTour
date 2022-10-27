import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"

const Team1 = (props: SvgProps) => (
  <Svg
    width={20}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h20v19H0z" />
    <Defs>
      <Pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#b" transform="matrix(.00408 0 0 .0043 -.014 0)" />
      </Pattern>
      <Image
        id="b"
        width={252}
        height={233}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
)

export default Team1