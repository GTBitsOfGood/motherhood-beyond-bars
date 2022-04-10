import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props: any) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.5 4.5c0-.825-.675-1.5-1.5-1.5H3c-.825 0-1.5.675-1.5 1.5v9c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-9Zm-1.5 0L9 8.25 3 4.5h12Zm0 9H3V6l6 3.75L15 6v7.5Z"
      fill="#666"
    />
  </Svg>
)

export default SvgComponent
