import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DeviceAppWrapper = styled.button`
  height: 100%;
  width: 100%;
  display: flex;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  color: white;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
`;
const DeviceAppIconWrapper = styled.div`
  height: var(--appIconSize);
  width: var(--appIconSize);
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  & > * {
    height: 100%;
    width: 100%;
  }
`;
const DeviceAppTitle = styled.div`
  text-align: center;
  white-space: nowrap;
`;
const DeviceApp = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
`;
const App = ({ app, deviceScreenRef, setCurrentAppRefs, homeRow }) => {
  const iconRefWrapper = useRef(null);
  const appRef = useRef(null);
  console.log(app);
  async function handleAppClick() {
    console.log(app.fullScreenRef);
    // debugger;
    app.ref = appRef;
    await setCurrentAppRefs(app.fullScreenRef, app.ref.current);
    // debugger;
    app.fullScreenRef.classList.add('fullScreenAppActive');
    console.log(app.fullScreenRef);
    if (!iconRefWrapper.current) return;
    const refCoords = iconRefWrapper.current.getBoundingClientRect();
    const deviceScreenRefCoords = deviceScreenRef.current.getBoundingClientRect();
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
    <>
      {app && (
        <DeviceAppWrapper
          className="deviceAppWrapper"
          type="button"
          onClick={handleAppClick}
          ref={appRef}
        >
          <DeviceApp className="deviceApp">
            <DeviceAppIconWrapper ref={iconRefWrapper}>
              {app.icon}
            </DeviceAppIconWrapper>
            {!homeRow && <DeviceAppTitle>{app.title}</DeviceAppTitle>}
          </DeviceApp>
        </DeviceAppWrapper>
      )}
    </>
  );
};

App.propTypes = {
  app: PropTypes.any,
  setCurrentAppRefs: PropTypes.any,
  deviceScreenRef: PropTypes.any,
  homeRow: PropTypes.any,
};

export default App;
