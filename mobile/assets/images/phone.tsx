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
      d="M12.75 14.25h-7.5V3.75h7.5v10.5Zm0-13.5h-7.5c-.832 0-1.5.667-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5h7.5a1.5 1.5 0 0 0 1.5-1.5V2.25a1.5 1.5 0 0 0-1.5-1.5Z"
      fill="#666"
    />
  </Svg>
)

export default SvgComponent
