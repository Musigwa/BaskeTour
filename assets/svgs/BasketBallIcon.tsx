import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const BasketBallIcon = (props: SvgProps) => (
  <Svg
    width={44}
    height={44}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill="#4833B5">
      <Path d="M39.264 8.436a19.263 19.263 0 0 0-5.511 12.275H44c-.27-4.62-2.03-8.857-4.736-12.275ZM23.29 0v20.71h7.885a21.84 21.84 0 0 1 6.38-14.216C33.875 2.822 28.806.324 23.289 0ZM33.753 23.29c.316 4.767 2.351 9.155 5.511 12.36C41.97 32.232 43.73 27.91 44 23.29H33.753ZM6.445 6.494a21.84 21.84 0 0 1 6.38 14.217h7.886V0C15.194.323 10.126 2.822 6.445 6.494ZM31.175 23.29h-7.886V44c5.517-.323 10.585-2.736 14.266-6.408-3.693-3.684-6.056-8.767-6.38-14.303ZM12.825 23.29c-.324 5.535-2.687 10.618-6.38 14.302 3.68 3.672 8.749 6.085 14.266 6.408V23.29h-7.886ZM0 23.29c.27 4.62 2.031 8.942 4.736 12.36 3.16-3.205 5.195-7.593 5.511-12.36H0ZM4.736 8.436C2.03 11.854.27 16.09 0 20.71h10.247A19.263 19.263 0 0 0 4.736 8.436Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h44v44H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default BasketBallIcon