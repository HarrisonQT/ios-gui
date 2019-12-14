import React from 'react';
import styled from 'styled-components';

const WifiSVGStyles = styled.svg`
  box-sizing: border-box;
  enable-background: new 0 0 96 96;
  .st0 {
    fill: white;
  }
`;

const WifiSVG = props => (
  <WifiSVGStyles
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 96 96"
    xmlSpace="preserve"
    {...props}
  >
    <g id="">
      <path
        id=""
        className="st0"
        d="M15.9,38.6l5.8,5.8c14.5-14.5,38-14.5,52.5,0l5.8-5.8C62.4,20.9,33.6,20.9,15.9,38.6z M39.2,61.9l8.8,8.8l8.8-8.8C51.9,57.1,44.1,57.1,39.2,61.9z M27.6,50.3l5.8,5.8c8.1-8.1,21.1-8.1,29.2,0l5.8-5.8 C57.1,39,38.9,39,27.6,50.3z"
      />
    </g>
  </WifiSVGStyles>
);

export default WifiSVG;
