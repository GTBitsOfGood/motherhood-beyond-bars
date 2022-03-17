import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h16ZM4 4v13.17L5.17 16H20V4H4Zm2 3h12v2H6V7Zm0 4h9v2H6v-2Z"
      fill="#304CD1"
    />
  </Svg>
)

export default SvgComponent
