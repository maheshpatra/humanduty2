import * as React from "react"
import { Dimensions } from 'react-native';
import Svg, { G, Path, Defs, Mask } from "react-native-svg"
const ts = Dimensions.get('window').width / 100;
function SvgComponent() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={ts*70}
      height={100}
      preserveAspectRatio="none"
      viewBox="0 0 950 500"
     
    >
       <G mask='url("#SvgjsMask1001")' fill="none">
        <Path
          d="M0 361c72-44.2 216-207.2 360-221 144-13.8 216 164.2 360 152 144-12.2 216-225.6 360-213 144 12.6 288 220.8 360 276v205H0z"
          fill="rgba(230, 66, 38, 1)"
        />
      </G>
      <Defs>
        <Mask id="SvgjsMask1001">
          <Path fill="#fff" d="M0 0H1440V560H0z" />
        </Mask>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
