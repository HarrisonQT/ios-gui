import React from 'react';
import styled from 'styled-components';

const BatterySVGStyles = styled.svg`
  box-sizing: border-box;
  enable-background: new 0 0 288 151.38;
  .st0 {
    fill: white;
  }
`;
const BatterySVG = props => (
  <BatterySVGStyles
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 288 151.38"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <path
        className="st0"
        d="M24.92,151.38h221.54c13.74,0,24.92-11.17,24.92-24.93v-22.26H288V46.04h-16.62V24.91
      C271.38,11.17,260.21,0,246.46,0H24.92C11.17,0,0,11.17,0,24.91v101.54C0,140.22,11.17,151.38,24.92,151.38L24.92,151.38z
      M24.92,134.77c-4.58,0-8.31-3.73-8.31-8.32V24.91c0-4.57,3.73-8.3,8.31-8.3h221.54c4.58,0,8.31,3.73,8.31,8.3v101.54
      c0,4.59-3.73,8.32-8.31,8.32H24.92L24.92,134.77z"
      />
      <polygon
        className="st0"
        points="25.69,127.25 245.61,127.25 245.61,24.91 25.69,24.91 25.69,127.25"
      />
    </g>
  </BatterySVGStyles>
);

export default BatterySVG;
