import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    width={32}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.727 1h28.546v9.5c0 6.904-5.597 12.5-12.5 12.5h-3.546c-6.904 0-12.5-5.596-12.5-12.5V1Z"
      stroke={props.color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M2 11.842A6.942 6.942 0 0 1 5.334 11C9.016 11 12 13.817 12 17.291c0 1.874-.869 3.556-2.246 4.709M30 11.842A6.943 6.943 0 0 0 26.667 11C22.985 11 20 13.817 20 17.291c0 1.874.869 3.556 2.246 4.709"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M1.227 3.555h7.318a1.5 1.5 0 0 1 1.5 1.5v.363a1.5 1.5 0 0 1-1.5 1.5H1.227V3.555ZM30.773 6.918h-7.318a1.5 1.5 0 0 1-1.5-1.5v-.364a1.5 1.5 0 0 1 1.5-1.5h7.318v3.364Z"
      stroke={props.color}
    />
  </Svg>
)

export default SvgComponent