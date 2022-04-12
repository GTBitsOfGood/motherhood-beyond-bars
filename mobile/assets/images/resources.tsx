import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.9 11.857V1H1.47v22a2 2 0 0 0 2.001 2h15.428a2 2 0 0 0 2-2v-3.143"
      stroke={props.color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M18.615 20.428a4.571 4.571 0 1 0 0-9.142 4.571 4.571 0 0 0 0 9.143ZM24.529 21.571l-2.486-2.486"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.042 5.571h10.286M6.042 9h10.286M6.042 12.429h9.143"
      stroke={props.color}
      strokeLinecap="round"
    />
  </Svg>
)

export default SvgComponent
