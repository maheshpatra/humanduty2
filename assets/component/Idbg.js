import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  Mask,
  LinearGradient,
  Stop
} from "react-native-svg"

function Idbg() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={900}
      height={150}
      preserveAspectRatio="none"
      viewBox="0 0 1840 500"
     
    >
      <G mask='url("#SvgjsMask1006")' fill="none">
        <Path
          d="M31 250L281 0h244.5l-250 250z"
          fill="url(#SvgjsLinearGradient1007)"
        />
        <Path
          d="M259.6 250l250-250h270l-250 250z"
          fill="url(#SvgjsLinearGradient1007)"
        />
        <Path
          d="M493.2 250l250-250h261l-250 250z"
          fill="url(#SvgjsLinearGradient1007)"
        />
        <Path
          d="M720.8 250l250-250h207l-250 250z"
          fill="url(#SvgjsLinearGradient1007)"
        />
        <Path
          d="M1409 250L1159 0H802l250 250z"
          fill="url(#SvgjsLinearGradient1008)"
        />
        <Path
          d="M1190.4 250L940.4 0h-300l250 250z"
          fill="url(#SvgjsLinearGradient1008)"
        />
        <Path
          d="M931.8 250L681.8 0H353.3l250 250z"
          fill="url(#SvgjsLinearGradient1008)"
        />
        <Path
          d="M700.2 250L450.2 0H154.7l250 250z"
          fill="url(#SvgjsLinearGradient1008)"
        />
        <Path
          d="M1254.146 250L1440 64.146V250z"
          fill="url(#SvgjsLinearGradient1007)"
        />
        <Path
          d="M0 250h185.854L0 64.146z"
          fill="url(#SvgjsLinearGradient1008)"
        />
      </G>
      <Defs>
        <Mask id="SvgjsMask1006">
          <Path fill="#fff" d="M0 0H1440V250H0z" />
        </Mask>
        <LinearGradient
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
          id="SvgjsLinearGradient1007"
        >
          <Stop stopColor="rgba(11, 52, 137, 0.78)" offset={0} />
          <Stop
            stopOpacity={0}
            stopColor="rgba(11, 52, 137, 0.78)"
            offset={0.66}
          />
        </LinearGradient>
        <LinearGradient
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
          id="SvgjsLinearGradient1008"
        >
          <Stop stopColor="rgba(11, 52, 137, 0.78)" offset={0} />
          <Stop
            stopOpacity={0}
            stopColor="rgba(11, 52, 137, 0.78)"
            offset={0.66}
          />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default Idbg;
