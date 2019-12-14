import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppPropTypes } from './lib/PropTypesValues';

const DeviceAppWrapper = styled.button`
  box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 10px;
  color: white;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
`;
const DeviceAppIconWrapper = styled.div`
  box-sizing: border-box;
  box-sizing: border-box;
  height: var(--appIconSize);
  width: var(--appIconSize);
  border-radius: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  & > * {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }
`;
const DeviceAppTitle = styled.div`
  box-sizing: border-box;
  margin-top: 1.5px;
  text-align: center;
  white-space: nowrap;
`;
const DeviceApp = styled.div`
  box-sizing: border-box;
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-content: space-between;
  flex-wrap: wrap;
`;

const App = ({
  app, deviceScreenRef, setCurrentAppRefs, homeRow,
}) => {
  const iconRefWrapper = useRef(null);
  const appRef = useRef(null);
  async function handleAppClick() {
    /* eslint-disable react/prop-types, no-param-reassign */
    app.ref = appRef;
    await setCurrentAppRefs(app.fullScreenRef, app.ref.current);
    app.fullScreenRef.classList.add('fullScreenAppActive');
    if (!iconRefWrapper.current) return;
    const refCoords = iconRefWrapper.current.getBoundingClientRect();
    const deviceScreenRefCoords = deviceScreenRef.current.getBoundingClientRect();
    const coords = {
      height: refCoords.height,
      width: refCoords.width,
      top: refCoords.top - (deviceScreenRefCoords.top - (refCoords.height / 2)),
      left: refCoords.left - (deviceScreenRefCoords.left + (refCoords.width / 2)),
    };
    app.fullScreenRef.style.setProperty('width', '100%');
    app.fullScreenRef.style.setProperty('height', '100%');
    app.fullScreenRef.style.left = `${coords.left}px`;
    app.fullScreenRef.style.top = `${coords.top}px`;
    app.fullScreenRef.style.setProperty(
      'transform',
      `translate(-${coords.left}px, -${coords.top}px)`,
    );
    /* eslint-enable react/prop-types, no-param-reassign */
  }
  return (
    <Fragment>
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
    </Fragment>
  );
};

App.propTypes = {
  app: AppPropTypes.isRequired,
  setCurrentAppRefs: PropTypes.func.isRequired,
  deviceScreenRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLDivElement),
  }).isRequired,
  homeRow: PropTypes.bool,
};
App.defaultProps = {
  homeRow: false,
};

export default App;
