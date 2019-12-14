import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppPropTypes } from './lib/PropTypesValues';

const FullScreenAppStyles = styled.div`
  box-sizing: border-box;
  position: absolute;
  height: var(--appHeight);
  width: var(--appWidth);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s, opacity 0.3s, transform 0.3s;
  &.fullScreenAppActive {
    opacity: 1;
    visibility: visible;
    z-index: 1;
    background-color: white;
  }
`;
const FullScreenApp = ({ app, setApp }) => {
  const ref = useRef(null);
  useEffect(() => {
    /* eslint-disable-next-line no-param-reassign */
    app.fullScreenRef = ref.current;
  }, [app, setApp]);
  return <FullScreenAppStyles ref={ref}>{app.content}</FullScreenAppStyles>;
};

FullScreenApp.propTypes = {
  app: AppPropTypes.isRequired,
  setApp: PropTypes.func.isRequired,
};

export default FullScreenApp;
