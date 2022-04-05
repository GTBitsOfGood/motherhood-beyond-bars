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
      d="M13 15.857a2.857 2.857 0 1 0 0-5.714 2.857 2.857 0 0 0 0 5.714Z"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.073 16.273a1.8 1.8 0 0 0 .36 1.985l.065.066a2.183 2.183 0 1 1-3.087 3.087l-.066-.066a1.8 1.8 0 0 0-1.985-.36 1.8 1.8 0 0 0-1.09 1.648v.185a2.182 2.182 0 0 1-4.364 0v-.098a1.8 1.8 0 0 0-1.179-1.647 1.8 1.8 0 0 0-1.985.36l-.066.065a2.183 2.183 0 1 1-3.087-3.087l.066-.066a1.8 1.8 0 0 0 .36-1.985 1.8 1.8 0 0 0-1.648-1.09h-.185a2.182 2.182 0 0 1 0-4.364h.098a1.8 1.8 0 0 0 1.647-1.179 1.8 1.8 0 0 0-.36-1.985l-.065-.066A2.182 2.182 0 1 1 7.589 4.59l.066.066a1.8 1.8 0 0 0 1.985.36h.087a1.8 1.8 0 0 0 1.091-1.648v-.185a2.182 2.182 0 0 1 4.364 0v.098a1.8 1.8 0 0 0 1.09 1.647 1.8 1.8 0 0 0 1.986-.36l.066-.065a2.183 2.183 0 1 1 3.087 3.087l-.066.066a1.8 1.8 0 0 0-.36 1.985v.087a1.8 1.8 0 0 0 1.648 1.091h.185a2.182 2.182 0 0 1 0 4.364h-.098a1.8 1.8 0 0 0-1.647 1.09v0Z"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
