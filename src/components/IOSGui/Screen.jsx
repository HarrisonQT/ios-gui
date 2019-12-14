import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppGrid from './AppGrid';
import FullScreenApp from './FullScreenApp';
import StatusBar from './StatusBar';
import { DevicePropTypes, AppsPropTypes } from './lib/PropTypesValues';

const DeviceScreenWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  left: var(--sideBezel);
  right: var(--sideBezel);
  top: ${props =>
    (props.orientation === 'landscape' && !props.appGrid.rotatable
      ? 'calc(100% - var(--topDownBezel))'
      : 'var(--topDownBezel)')};
  bottom: var(--topDownBezel);
  height: ${props =>
    (props.orientation === 'landscape' && !props.appGrid.rotatable
      ? 'var(--displayWidth)'
      : 'calc(100% - var(--topDownBezel) * 2)')};
  width: ${props =>
    (props.orientation === 'landscape' && !props.appGrid.rotatable
      ? 'var(--displayHeight)'
      : 'calc(100% - var(--sideBezel) * 2)')};
  transform-origin: left top;
  transform: rotate(
    ${props =>
    (props.orientation === 'landscape' && !props.appGrid.rotatable
      ? '-90deg'
      : '0deg')}
  );
  overflow: hidden;
  border-radius: 5px 5px;
  box-shadow: inset 0px 0px 2px 2px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  padding: 1.5px;
  background-color: white;
`;

const DeviceScreen = styled.div`
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(var(--statusBarHeight), 20px) 0px 1fr;
  background: ${props => props.wallpaper};
  background-position: center;
  background-size: cover;
  border-radius: 5px;
`;

const DeviceScreenNavigationBar = styled.div`
  box-sizing: border-box;
`;

const DeviceScreenInner = styled.div`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  pointer-events: all;
`;
const Screen = ({
  device, orientation, apps, homeApps, setCurrentAppRefs, wallpaper,
}) => {
  async function setApp(app, ref) {
    /* eslint-disable-next-line no-param-reassign */
    app.fullScreenRef = ref.current;
  }
  return (
    <DeviceScreenWrapper
      className="DeviceScreenWrapper"
      orientation={orientation}
      appGrid={device.appGrid}
      ref={device.deviceScreenRef}
    >
      <DeviceScreen className="DeviceScreen" wallpaper={wallpaper}>
        <StatusBar device={device} />
        <DeviceScreenNavigationBar className="DeviceScreenNavigationBar" />
        <DeviceScreenInner className="DeviceScreenInner">
          {apps.map((app, index) => (
            <FullScreenApp
              app={app}
              setApp={setApp}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            />
          ))}
          {homeApps.map((app, index) => (
            <FullScreenApp
              app={app}
              setApp={setApp}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
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
  device: DevicePropTypes.isRequired,
  orientation: PropTypes.string.isRequired,
  apps: AppsPropTypes,
  homeApps: AppsPropTypes,
  setCurrentAppRefs: PropTypes.func.isRequired,
  wallpaper: PropTypes.string,
};
Screen.defaultProps = {
  wallpaper: 'linear-gradient(to top, rgb(203, 163, 145) 0%, rgb(162, 206, 198) 28%, rgb(74, 192, 201) 48%, rgb(0, 164, 182) 88%, rgb(0, 144, 163) 100%)',
  apps: [],
  homeApps: [],
};

export default Screen;
