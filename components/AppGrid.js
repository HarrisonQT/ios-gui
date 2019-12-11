import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import App from './App';

const DeviceHomeGridWrapper = styled.div`
  --innerHeight: calc(var(--displayHeight) - var(--statusBarHeight));
  --innerWidth: var(--displayWidth);
  --gridColumns: ${props =>
    props.appGrid.rotatable && props.orientation === 'landscape'
      ? `${props.appGrid.rows}`
      : `${props.appGrid.columns}`};
  --gridRows: ${props =>
    props.appGrid.rotatable && props.orientation === 'landscape'
      ? `${props.appGrid.columns}`
      : `${props.appGrid.rows}`};
  --gridPaddingColumn: calc(
    (var(--innerWidth) - var(--appIconSize) * var(--gridColumns)) /
      (var(--gridColumns) + 1)
  );
  display: grid;
  grid-template-rows: auto calc(var(--homeTrayHeight));
  height: 100%;
  width: 100%;
  .appGridWrapper {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
  }
  .appGrid {
    width: 100%;
    display: grid;
    justify-content: space-evenly;
  }
`;

const DeviceAppGridWrapper = styled.div``;
const DeviceAppGrid = styled.div`
  height: 100%;
  grid-template-columns: repeat(var(--gridColumns), var(--appWidth));
  grid-template-rows: repeat(var(--gridRows), var(--appHeight));
  align-content: space-evenly;
  .deviceAppWrapper {
    height: var(--appHeight);
    width: var(--appWidth);
  }
`;
const DeviceAppGridHomeRowWrapper = styled.div`
  height: var(--appIconSize);
  background: rgba(0, 0, 0, 0.5);
  .deviceAppWrapper {
    height: var(--appIconSize);
    width: var(--appIconSize);
  }
`;
const DeviceAppGridHomeRow = styled.div`
  height: var(--appIconSize);
  display: grid;
  grid-template-columns: repeat(4, var(--appIconSize));
  grid-template-rows: 1fr;
  align-content: center;
`;
const AppGrid = ({
  device,
  orientation,
  homeApps,
  apps,
  setCurrentAppRefs,
}) => (
  // const apps = [{ title: 'Gmail', icon: '' }];
  <DeviceHomeGridWrapper appGrid={device.appGrid} orientation={orientation}>
    <DeviceAppGridWrapper className="appGridWrapper">
      <DeviceAppGrid className="appGrid" orientation={orientation}>
        {apps.map((app, index) => (
          <App
            key={index}
            app={app}
            deviceScreenRef={device.deviceScreenRef}
            setCurrentAppRefs={setCurrentAppRefs}
          />
        ))}
      </DeviceAppGrid>
    </DeviceAppGridWrapper>
    <DeviceAppGridHomeRowWrapper className="appGridWrapper">
      <DeviceAppGridHomeRow className="appGrid">
        {homeApps.map((app, index) => (
          <App
            key={index}
            app={app}
            setCurrentAppRefs={setCurrentAppRefs}
            deviceScreenRef={device.deviceScreenRef}
          />
        ))}
      </DeviceAppGridHomeRow>
    </DeviceAppGridHomeRowWrapper>
  </DeviceHomeGridWrapper>
);
AppGrid.propTypes = {
  orientation: PropTypes.any,
  device: PropTypes.any,
  apps: PropTypes.any,
  homeApps: PropTypes.any,
  setCurrentAppRefs: PropTypes.any,
};

export default AppGrid;
