import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const FacebookLogo = (props: SvgProps) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M18.777 0H3.223A3.227 3.227 0 0 0 0 3.223v15.554A3.226 3.226 0 0 0 3.223 22H9.71v-7.777H7.133v-3.868H9.71v-2.62a3.871 3.871 0 0 1 3.867-3.868h3.91v3.867h-3.91v2.621h3.91l-.644 3.868h-3.266V22h5.2A3.226 3.226 0 0 0 22 18.777V3.223A3.226 3.226 0 0 0 18.777 0Z"
      fill="#fff"
    />
  </Svg>
)

export default FacebookLogo