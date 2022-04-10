import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    width={72}
    height={69}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M34 8.5V69L0 32.333V10.167L9.154 0h17L34 8.5Z" fill="#fff" />
    <Path
      d="M38 8.5V69l34-36.667V10.167L62.846 0h-17L38 8.5Z"
      fill="url(#a)"
      fillOpacity={0.8}
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={55}
        y1={0}
        x2={97.497}
        y2={59.715}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#fff" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
)

export default SvgComponent
