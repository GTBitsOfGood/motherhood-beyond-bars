import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props: any) => (
  <Svg
    width={14}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M13.177 11.998H.822a.667.667 0 0 1-.577-1L6.422.332a.667.667 0 0 1 1.154 0l6.177 10.666a.667.667 0 0 1-.576 1ZM6.333 8.665v1.333h1.332V8.665H6.333Zm0-4.667v3.334h1.334V3.998H6.333Z"
      fill="#FF3939"
    />
  </Svg>
);

export default SvgComponent;
