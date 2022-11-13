import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props: any) => (
    <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M15 18L9 12L15 6"
            stroke="#304CD1"
            stroke-width="3"
            stroke-linecap="square"
            stroke-linejoin="round"
        />
    </Svg>
);

export default SvgComponent;