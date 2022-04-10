import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    viewBox="0 0 375 168"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h375v168H0z" />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(391.50036 137.67399 -118.05372 335.70664 91.5 50.69)"
      >
        <Stop offset={0} stopColor="#EDB1CB" />
        <Stop offset={1} stopColor="#4C6AF4" />
      </RadialGradient>
    </Defs>
  </Svg>
)

export default SvgComponent
