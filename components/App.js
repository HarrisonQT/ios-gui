import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

const DeviceAppWrapper = styled.button`
  display: flex;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  color: white;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
`;
const DeviceAppIcon = styled.div`
  height: var(--appIconSize);
  width: var(--appIconSize);
  background: linear-gradient(#86fe65 0%, #06d315 100%);
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 50%;
    width: 50%;
  }
`;
const DeviceAppTitle = styled.div`
  margin-top: 1px;
  text-align: center;
`;
const DeviceApp = styled.div``;
const App = ({ app, deviceScreenRef, setCurrentAppRefs }) => {
  const iconRef = useRef();
  const appRef = useRef();
  app.ref = appRef;
  async function handleAppClick() {
    app.fullScreenRef.classList.add('fullScreenAppActive');

    setCurrentAppRefs(app.fullScreenRef, appRef.current);
    console.log(app.fullScreenRef, appRef.current);
    if (!iconRef.current) return;
    const refCoords = iconRef.current.getBoundingClientRect();
    const deviceScreenRefCoords = deviceScreenRef.current.getBoundingClientRect();
    console.log(refCoords);
    const coords = {
      height: refCoords.height,
      width: refCoords.width,
      top: refCoords.top - deviceScreenRefCoords.top - refCoords.height / 2,
      left: refCoords.left - deviceScreenRefCoords.left + refCoords.width / 2,
    };

    app.fullScreenRef.style.setProperty('width', `100%`);
    app.fullScreenRef.style.setProperty('height', `100%`);
    app.fullScreenRef.style.left = `${coords.left}px`;
    app.fullScreenRef.style.top = `${coords.top}px`;

    app.fullScreenRef.style.setProperty(
      'transform',
      `translate(-${coords.left}px, -${coords.top}px)`
    );
  }
  return (
    <DeviceAppWrapper
      className="deviceAppWrapper"
      type="button"
      onClick={handleAppClick}
      ref={appRef}
    >
      <DeviceApp className="deviceApp">
        <DeviceAppIcon ref={iconRef}>
          <FontAwesomeIcon icon={faPhoneAlt} size="2x" />
        </DeviceAppIcon>
        {app.title && <DeviceAppTitle>{app.title}</DeviceAppTitle>}
      </DeviceApp>
    </DeviceAppWrapper>
  );
};

App.propTypes = {
  app: PropTypes.any,
  setCurrentAppRefs: PropTypes.any,
  deviceScreenRef: PropTypes.any,
};

export default App;
