import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    viewBox="0 0 376 87"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="url(#a)" d="M-1 0h376v87H-1z" />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(15.101 85.138 276.593) scale(422.892 206.8)"
      >
        <Stop stopColor="#EDB1CB" />
        <Stop offset={0.777} stopColor="#4C6AF4" />
      </RadialGradient>
    </Defs>
  </Svg>
)

export default SvgComponent
