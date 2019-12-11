import React, { useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FullScreenAppStyles = styled.div`
  position: absolute;
  height: var(--appHeight);
  width: var(--appWidth);
  /* background-color: blue; */
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s, opacity 0.3s, transform 0.3s;
  &.fullScreenAppActive {
    opacity: 1;
    visibility: visible;
  }
`;
const FullScreenApp = React.forwardRef(({ app }, ref) => (
  <FullScreenAppStyles ref={ref} app={app}>
    {app.app}
  </FullScreenAppStyles>
));

// FullScreenApp.propTypes = {};

export default FullScreenApp;
