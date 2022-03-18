import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    viewBox="0 0 375 812"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h375v812H0z" />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(61.294 -160.999 199.714) scale(646.451 713.447)"
      >
        <Stop offset={0} stopColor="#EDB1CB" />
        <Stop offset={1} stopColor="#4C6AF4" />
      </RadialGradient>
    </Defs>
  </Svg>
)

export default SvgComponent
