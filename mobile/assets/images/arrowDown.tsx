import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props: any) => (
  <Svg
    width="15"
    height="9"
    viewBox="0 0 15 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2.33625 0.331848L7.5 5.48435L12.6637 0.331848L14.25 1.9181L7.5 8.6681L0.75 1.9181L2.33625 0.331848Z"
      fill="black"
    />
  </Svg>
);

export default SvgComponent;
