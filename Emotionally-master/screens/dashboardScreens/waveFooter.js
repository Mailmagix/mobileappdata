import React from 'react';
import Svg, {Path} from 'react-native-svg';

const WaveBorder = ({color, style}) => {
  return (
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 360 48"
      style={style}
      preserveAspectRatio="none">
      <Path
        fill={color}
        d="M0 0C0 0 103.5 9 181.5 9C259.5 9 360 0 360 0V48H0V0Z"
      />
    </Svg>
  );
};

export default WaveBorder;
