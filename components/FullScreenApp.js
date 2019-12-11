import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FullScreenAppStyles = styled.div`
  position: absolute;
  height: var(--appHeight);
  width: var(--appWidth);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s, opacity 0.3s, transform 0.3s;
  &.fullScreenAppActive {
    opacity: 1;
    visibility: visible;
  }
`;
const FullScreenApp = ({ app, setApp }) => {
  const ref = useRef();
  useEffect(() => {
    setApp(ref);
    app.fullScreenRef = ref.current;
  }, [app.fullScreenRef, setApp]);
  return <FullScreenAppStyles ref={ref}>{app.app}</FullScreenAppStyles>;
};

FullScreenApp.propTypes = {
  app: PropTypes.any,
  setApp: PropTypes.any,
};

export default FullScreenApp;
