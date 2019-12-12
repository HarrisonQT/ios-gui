import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppGrid from './AppGrid';
import FullScreenApp from './FullScreenApp';
import StatusBar from './StatusBar';

const DeviceScreenWrapper = styled.div`
  position: relative;
  left: var(--sideBezel);
  right: var(--sideBezel);
  top: ${props =>
    props.orientation === 'landscape' && !props.appGrid.rotatable
      ? 'calc(100% - var(--topDownBezel))'
      : 'var(--topDownBezel)'};
  bottom: var(--topDownBezel);
  height: ${props =>
    props.orientation === 'landscape' && !props.appGrid.rotatable
      ? 'var(--displayWidth)'
      : 'calc(100% - var(--topDownBezel) * 2)'};
  width: ${props =>
    props.orientation === 'landscape' && !props.appGrid.rotatable
      ? 'var(--displayHeight)'
      : 'calc(100% - var(--sideBezel) * 2)'};
  transform-origin: left top;
  transform: rotate(
    ${props =>
      props.orientation === 'landscape' && !props.appGrid.rotatable
        ? '-90deg'
        : '0deg'}
  );
  overflow: hidden;
  border-radius: 5px 5px;
  box-shadow: inset 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  padding: 1px;
  background-color: white;
`;

const DeviceScreen = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(var(--statusBarHeight), 20px) 0px 1fr;
  background-image: url('/wallpaper.png');
  background-position: center;
  background-size: cover;
  border-radius: 5px;
`;

const DeviceScreenNavigationBar = styled.div``;

const DeviceScreenInner = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  pointer-events: all;
`;
const Screen = ({ device, orientation, apps, homeApps, setCurrentAppRefs }) => {
  async function setApp(app, ref) {
    app.fullScreenRef = ref.current;
  }
  return (
    <DeviceScreenWrapper
      className="DeviceScreenWrapper"
      orientation={orientation}
      appGrid={device.appGrid}
      ref={device.deviceScreenRef}
    >
      <DeviceScreen className="DeviceScreen">
        <StatusBar device={device} />
        <DeviceScreenNavigationBar className="DeviceScreenNavigationBar"></DeviceScreenNavigationBar>
        <DeviceScreenInner className="DeviceScreenInner">
          {apps.map((app, index) => (
            <FullScreenApp
              app={app}
              setApp={setApp}
              key={`${index}${device.name}apps`}
            />
          ))}
          {homeApps.map((app, index) => (
            <FullScreenApp
              app={app}
              setApp={setApp}
              key={`${index}${device.name}homeRow`}
            />
          ))}
          <AppGrid
            device={device}
            orientation={orientation}
            homeApps={homeApps}
            apps={apps}
            setCurrentAppRefs={setCurrentAppRefs}
          />
        </DeviceScreenInner>
      </DeviceScreen>
    </DeviceScreenWrapper>
  );
};

Screen.propTypes = {
  device: PropTypes.any,
  orientation: PropTypes.any,
  apps: PropTypes.any,
  homeApps: PropTypes.any,
  setCurrentAppRefs: PropTypes.any,
};

export default Screen;
