import React, { useRef, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BatterySVG from './BatterySVG';
import WifiSVG from './WifiSVG';
import {
  calculateByDiagonal,
  calculateDiagonal,
} from '../lib/calculateDimensions';
import { SCREEN_WIDTHS, DEVICES, COLORS } from '../lib/constants';
import AppGrid from './AppGrid';
import FullScreenApp from './FullScreenApp';

const LEFT_RIGHT = '45px';
const TOP_DOWN = '12px';
const HOME_BUTTON_ACTIVE = 'homeButtonActive';

const IOSGuiAppStyles = styled.div`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  color: white;
  height: 100%;
  width: 100%;
  position: relative;
  /* @media (max-width: ${SCREEN_WIDTHS.small}) {
    --leftRight: ${TOP_DOWN};
    --topDown: ${LEFT_RIGHT};
    .tabletDesign {
      &.webcam {
        top: calc(var(--topDown) / 2 - 5px);
        left: 50%;
        height: 10px;
        width: 10px;
      }
      &.homeButton {
        top: calc(100% - var(--topDown) / 2 - 15px);
        left: 48%;
        height: 30px;
        width: 30px;
      }
      &.statusBar {
        top: var(--wrapperInset);
        left: var(--wrapperInset);
        right: var(--wrapperInset);
        height: var(--statusBarHeight);
        width: calc(100% - var(--wrapperInset) * 2);
        .ipad {
          svg {
          }
        }
        .battery {
        }
      }
    }
  } */
`;

const DeviceWrapper = styled.div`
  --height: ${props => `${props.dimensions.height}px`};
  --width: ${props => `${props.dimensions.width}px`};
  --sideBezel: ${props =>
    `calc(${props.dimensions.width}px * ${props.device.ratios.bezel.side})`};
  --topDownBezel: ${props =>
    `calc(${props.dimensions.height}px * ${props.device.ratios.bezel.topDown})`};
  --displayHeight: calc(var(--height) - var(--topDownBezel) * 2);
  --displayWidth: calc(var(--width) - var(--sideBezel) * 2);
  --statusBarHeight: calc(
    var(--displayHeight) * ${props => props.device.ratios.statusBar}
  );
  --statusBarHeight: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.statusBar} * var(--displayWidth))`
      : `calc(${props.device.ratios.statusBar} * var(--displayHeight))`};
  --homeButtonDiameter: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.homeButtonDiameter} * var(--height))`
      : `calc(${props.device.ratios.homeButtonDiameter} * var(--width))`};
  --homeButtonTop: ${props =>
    props.orientation === 'landscape'
      ? `calc(var(--height)/2 - var(--homeButtonDiameter)/2)`
      : `calc(var(--height) - var(--topDownBezel)/2 - var(--homeButtonDiameter)/2)`};
  --homeButtonLeft: ${props =>
    props.orientation === 'landscape'
      ? `calc(var(--width) - var(--sideBezel)/2 - var(--homeButtonDiameter)/2)`
      : `calc(var(--width)/2 - var(--homeButtonDiameter)/2)`};
  --topHardwareReceiverHeight: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.receiver.height} * var(--height))`
      : `calc(${props.device.ratios.receiver.height} * var(--width))`};
  --topHardwareReceiverWidth: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.receiver.width} * var(--height))`
      : `calc(${props.device.ratios.receiver.width} * var(--width))`};
  --topHardwareHeight: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.topHardware.height} * var(--height))`
      : `calc(${props.device.ratios.topHardware.height} * var(--width))`};
  --topHardwareWidth: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.topHardware.width} * var(--height))`
      : `calc(${props.device.ratios.topHardware.width} * var(--width))`};
  --topHardwareTop: ${props =>
    props.orientation === 'landscape'
      ? `calc(var(--height)/2 - var(--webcamDiameter)/2)`
      : `calc(var(--topDownBezel)/2 - var(--webcamDiameter)/2)`};
  --topHardwareLeft: ${props =>
    props.orientation === 'landscape'
      ? `calc(var(--sideBezel)/2 - var(--topHardwareWidth)/2)`
      : `calc(var(--width)/2 - var(--topHardwareWidth)/2)`};
  --webcamDiameter: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.webcamDiameter} * var(--height))`
      : `calc(${props.device.ratios.webcamDiameter} * var(--width))`};
  --receiverHeight: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.receiver.height} * var(--height))`
      : `calc(${props.device.ratios.receiver.height} * var(--width))`};
  --receiverWidth: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.receiver.width} * var(--height))`
      : `calc(${props.device.ratios.receiver.width} * var(--width))`};

  --appIconSize: ${props =>
    props.orientation === 'landscape'
      ? `calc(${props.device.ratios.appSize} * var(--width))`
      : `calc(${props.device.ratios.appSize} * var(--height))`};
  --appTitleHeight: 12px;
  --appHeight: calc(var(--appIconSize) + var(--appTitleHeight));
  --appWidth: var(--appIconSize);
  --homeTrayHeight: calc(var(--appHeight) + var(--appTitleHeight));
  --urlBarHeight: 30px;
  --wrapperInset: 2px;
  top: 0;
  left: 0;
  background-color: ${props => props.color};
  height: var(--height);
  width: var(--width);
  position: absolute;
  border-radius: 20px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.4);
  .horz,
  .vert {
    position: absolute;
    display: block;
    border: 1px solid black;
  }
  .horz {
    top: calc(var(--height) / 2);
    width: var(--width);
    height: 1px;
  }
  .vert {
    left: calc(var(--width) / 2);
    width: 1px;
    height: var(--height);
  }
`;

const Device = styled.div`
  height: 100%;
  width: 100%;
`;

const DeviceHardware = styled.div`
  position: absolute;
  .deviceInterface {
    position: absolute;
    display: block;
  }
  .topHardware {
    top: var(--topHardwareTop);
    left: var(--topHardwareLeft);
    height: var(--topHardwareHeight);
    width: var(--topHardwareWidth);
    display: flex;
    justify-content: space-around;
    align-items: center;
    transform: rotate(
      ${props => (props.orientation === 'landscape' ? '-90deg' : '0deg')}
    );
  }
  .webcam {
    left: calc((var(--topHardwareWidth) - var(--receiverWidth)) / 2 * -1);
    position: absolute;
    border: 1.2px solid black;
    background-color: #666;
    height: var(--webcamDiameter);
    width: var(--webcamDiameter);
    border-radius: 50%;
    box-shadow: inset 0 3px 3px 0 rgba(0, 0, 0, 0.4);
  }
  .receiver {
    border: 1.2px solid black;
    background-color: #666;
    height: var(--receiverHeight);
    width: var(--receiverWidth);
    box-shadow: inset 0 3px 3px 0 rgba(0, 0, 0, 0.4);
  }
  .homeButton {
    top: var(--homeButtonTop);
    left: var(--homeButtonLeft);
    border: 1.2px solid #202020;
    height: var(--homeButtonDiameter);
    width: var(--homeButtonDiameter);
    border-radius: 50%;
    box-shadow: inset 0 0 3px 3px rgba(0, 0, 0, 0.4);
    justify-content: space-around;
    align-items: center;
    position: relative;
    overflow: hidden;

    &.homeButtonActive {
      .homeButtonInner {
        box-shadow: 0 0 5px 2px #666;
        transform: scale(0.9);
        transition: transform 0.2s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      }
    }
    .homeButtonInner {
      --offset: 12%;
      left: calc(0% + var(--offset) / 2);
      top: calc(0% + var(--offset) / 2);
      position: absolute;
      width: calc(100% - var(--offset));
      height: calc(100% - var(--offset));
      background-color: #eee;
      border-radius: 50%;
      z-index: 1;
    }
    .homeButtonBackground {
      --overflow: 50%;
      left: calc(0% - var(--overflow) / 2);
      top: calc(0% - var(--overflow) / 2);
      position: absolute;
      width: calc(100% + var(--overflow));
      height: calc(100% + var(--overflow));
      background: radial-gradient(#eaeaea, #262626);
      border-radius: 50%;
      z-index: 0;
    }
  }
`;
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
const DeviceScreenStatusBar = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 5px;
  border-radius: 5px 5px 0 0;
  height: var(--statusBarHeight);
  min-height: 20px;
  & > * {
    height: 100%;
  }
  .ipad {
    svg {
      height: var(--statusBarHeight);
      min-height: 20px;
      width: 15px;
      margin: 0 0 0 1px;
    }
  }
  .time,
  .ipad,
  .battery {
    display: flex;
    align-items: center;
  }
  .text {
    white-space: nowrap;
  }
  .battery {
    svg {
      height: var(--statusBarHeight);
      min-height: 20px;
      width: 15px;
      margin: 2px 0 0 2px;
    }
  }
`;

const DeviceScreenNavigationBar = styled.div``;

const DeviceScreenInner = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  pointer-events: all;
`;

function calculateDeviceDimensions(device, orientation) {
  const { height: displayHeight, width: displayWidth } = calculateByDiagonal(
    device.display.inches.aspectRatioHeight,
    device.display.inches.aspectRatioWidth,
    device.display.inches.diagonal
  );
  device.display.inches.height = displayHeight;
  device.display.inches.width = displayWidth;
  device.display.pixels.diagonal = calculateDiagonal(
    displayHeight,
    displayWidth
  );
  const hasReceiver = 'receiver' in device.size.inches;
  // inches to pixels relative to deice size
  let deviceSizeReceiverPixelHeight;
  let deviceSizeReceiverPixelWidth;
  const deviceSizePixelHeight =
    (device.display.pixels.height / displayHeight) * device.size.inches.height;
  const deviceSizePixelWidth =
    (device.display.pixels.width / displayWidth) * device.size.inches.width;
  const deviceSizePixelHomeButtonDiameter =
    (device.display.pixels.width / displayWidth) *
    device.size.inches.homeButtonDiameter;
  const deviceSizePixelTopHardwareHeight =
    (device.display.pixels.height / displayHeight) *
    device.size.inches.topHardware.height;
  const deviceSizePixelTopHardwareWidth =
    (device.display.pixels.width / displayWidth) *
    device.size.inches.topHardware.width;
  const deviceSizePixelWebcamDiameter =
    (device.display.pixels.width / displayWidth) *
    device.size.inches.webcamDiameter;
  if (hasReceiver) {
    deviceSizeReceiverPixelHeight =
      (device.display.pixels.height / displayHeight) *
      device.size.inches.receiver.height;
    deviceSizeReceiverPixelWidth =
      (device.display.pixels.width / displayWidth) *
      device.size.inches.receiver.width;
  }

  device.size.pixels = {};
  device.size.pixels.height = deviceSizePixelHeight;
  device.size.pixels.width = deviceSizePixelWidth;
  const deviceSizePixelApp =
    (device.display.pixels.width - device.display.pixels.width * 0.05 * 7) / 7;
  device.size.pixels.homeButtonDiameter = deviceSizePixelHomeButtonDiameter;
  device.size.pixels.webcamDiameter = deviceSizePixelWebcamDiameter;
  device.size.pixels.topHardware = {};
  device.size.pixels.topHardware.height = deviceSizePixelTopHardwareHeight;
  device.size.pixels.topHardware.width = deviceSizePixelTopHardwareWidth;
  device.display.pixels.appSize = deviceSizePixelApp;

  device.size.pixels.diagonal = calculateDiagonal(
    deviceSizePixelHeight,
    deviceSizePixelWidth
  );
  device.ratios = {};
  device.ratios.display = {};
  device.ratios.display.height =
    device.display.pixels.height / device.size.pixels.height;
  device.ratios.display.width =
    device.display.pixels.width / device.size.pixels.width;
  device.ratios.size = device.size.inches.width / device.size.inches.height;
  device.ratios.homeButtonDiameter =
    deviceSizePixelHomeButtonDiameter / device.size.pixels.width;

  device.ratios.webcamDiameter =
    deviceSizePixelWebcamDiameter / device.size.pixels.width;
  device.ratios.topHardware = {};

  device.ratios.topHardware.height =
    deviceSizePixelTopHardwareHeight / device.size.pixels.height;
  device.ratios.topHardware.width =
    deviceSizePixelTopHardwareWidth / device.size.pixels.width;

  device.ratios.receiver = {
    height: device.ratios.webcamDiameter,
    width: device.ratios.webcamDiameter,
  };
  if (hasReceiver) {
    device.ratios.receiver.height =
      deviceSizeReceiverPixelHeight / device.size.pixels.height;
    device.ratios.receiver.width =
      deviceSizeReceiverPixelWidth / device.size.pixels.width;
  }

  device.ratios.statusBar =
    device.display.pixels.statusBar / device.display.pixels.height;
  device.ratios.navigationBar =
    device.display.pixels.navigationBar / device.display.pixels.height;
  device.ratios.appSize =
    device.display.pixels.appSize / device.display.pixels.height;
  // device.ratios.appSize =
  //     device.display.pixels.appSize / device.display.pixels.height;
  device.ratios.bezel = {};
  const s =
    (device.size.pixels.width - device.display.pixels.width) /
    device.size.pixels.width /
    2;
  const td =
    (device.size.pixels.height - device.display.pixels.height) /
    device.size.pixels.height /
    2;
  device.ratios.bezel.side = orientation === 'portrait' ? s : td;
  device.ratios.bezel.topDown = orientation === 'portrait' ? td : s;

  return device;
}

const IOSGuiApp = ({
  orientation = 'landscape',
  height = 0,
  width = 0,
  color = COLORS.white,
  deviceType = DEVICES.ipad['2017'],
  apps = Array.from({ length: 24 }),
  homeApps = Array.from({ length: 4 }),
}) => {
  const deviceRef = useRef();
  const homeButtonRef = useRef();
  let currentFullscreenRef = useRef(null);
  let currentAppRef = null;

  const d = { ...deviceType };
  const device = calculateDeviceDimensions(d, orientation);

  device.deviceScreenRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width, height });
  const date = new Date();
  // console.table(apps);
  const setRef = (app, ref) => {
    app.fullScreenRef = ref;
  };
  const setCurrentFullScreenRef = ref => {
    currentFullscreenRef = ref;
  };
  const setCurrentAppRef = ref => {
    currentAppRef = ref;
  };
  function triggerHomeButton(ref) {
    ref.current.classList.add(HOME_BUTTON_ACTIVE);
    console.log(currentFullscreenRef.current);
    if (
      currentFullscreenRef.current !== null &&
      currentFullscreenRef.classList.contains('fullScreenAppActive')
    ) {
      const refCoords = currentAppRef.current.getBoundingClientRect();
      console.log(currentFullscreenRef, currentAppRef.current);
      const deviceScreenRefCoords = device.deviceScreenRef.current.getBoundingClientRect();
      console.log(
        refCoords,
        deviceScreenRefCoords,
        device.deviceScreenRef.current,
        currentAppRef.current
      );
      const coords = {
        top: refCoords.top - deviceScreenRefCoords.top,
        left: refCoords.left - deviceScreenRefCoords.left,
        bottom: refCoords.bottom - deviceScreenRefCoords.bottom,
        right: refCoords.right - deviceScreenRefCoords.right,
      };
      currentFullscreenRef.classList.remove('fullScreenAppActive');
      currentFullscreenRef.style.setProperty('width', `var(--appWidth)`);
      currentFullscreenRef.style.setProperty('height', `var(--appHeight)`);
      currentFullscreenRef.style.left = `${coords.left}px`;
      currentFullscreenRef.style.top = `${coords.top}px`;
      currentFullscreenRef.style.right = `${coords.right}px`;
      currentFullscreenRef.style.bottom = `${coords.bottom}px`;
      currentFullscreenRef.style.transform = ``;
    }
    setTimeout(() => {
      if (ref.current.classList.contains(HOME_BUTTON_ACTIVE)) {
        ref.current.classList.remove(HOME_BUTTON_ACTIVE);
      }
    }, 200);
  }
  useLayoutEffect(() => {
    if (deviceRef.current) {
      let w;
      let h;
      if (orientation === 'landscape') {
        if (
          deviceRef.current.offsetWidth * device.ratios.size >
          deviceRef.current.offsetHeight
        ) {
          h = deviceRef.current.offsetHeight;
          w = h / device.ratios.size;
        } else {
          w = deviceRef.current.offsetWidth;
          h = w * device.ratios.size;
        }
      } else {
        // orientation === 'portrait'
        // eslint-disable-next-line no-lonely-if
        if (
          deviceRef.current.offsetHeight * device.ratios.size >
          deviceRef.current.offsetWidth
        ) {
          w = deviceRef.current.offsetWidth;
          h = w / device.ratios.size;
        } else {
          h = deviceRef.current.offsetHeight;
          w = h * device.ratios.size;
        }
      }

      setDimensions({
        width: w,
        height: h,
      });
    }
  }, [device.ratios.size, orientation]);

  // console.table(device);
  return (
    <IOSGuiAppStyles
      ref={deviceRef}
      className="IOSGuiAppStyles"
      height={height}
    >
      <DeviceWrapper
        className="DeviceWrapper"
        dimensions={dimensions}
        device={device}
        orientation={orientation}
        color={color}
      >
        <span className="deviceInterface horz"></span>
        <span className="deviceInterface vert"></span>
        <Device className="Device">
          <DeviceHardware className="DeviceHardware" orientation={orientation}>
            <div className="deviceInterface topHardware">
              <span className="webcam"></span>
              {device.size.inches.receiver && (
                <span className="receiver"></span>
              )}
            </div>
            <button
              className="deviceInterface homeButton"
              ref={homeButtonRef}
              onClick={() => triggerHomeButton(homeButtonRef)}
              type="button"
            >
              <div className="homeButtonInner"></div>
              <div className="homeButtonBackground"></div>
            </button>
          </DeviceHardware>
          <DeviceScreenWrapper
            className="DeviceScreenWrapper"
            orientation={orientation}
            appGrid={device.appGrid}
            ref={device.deviceScreenRef}
          >
            <DeviceScreen className="DeviceScreen">
              <DeviceScreenStatusBar className="DeviceScreenStatusBar">
                <div className="ipad">
                  <span className="text">{device.name}</span>
                  <WifiSVG className="wifi" />
                </div>

                <div className="time">
                  <span className="text">
                    {date.toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className="battery">
                  <span className="text">100%</span>

                  <BatterySVG className="wifi" />
                </div>
              </DeviceScreenStatusBar>
              <DeviceScreenNavigationBar className="DeviceScreenNavigationBar"></DeviceScreenNavigationBar>
              <DeviceScreenInner className="DeviceScreenInner">
                {apps.map((app, index) => (
                  <FullScreenApp
                    app={app}
                    ref={ref => setRef(app, ref)}
                    key={index}
                  />
                ))}
                {homeApps.map((app, index) => (
                  <FullScreenApp
                    app={app}
                    ref={ref => setRef(app, ref)}
                    key={index}
                  />
                ))}
                <AppGrid
                  device={device}
                  orientation={orientation}
                  homeApps={homeApps}
                  apps={apps}
                  setCurrentFullScreenRef={setCurrentFullScreenRef}
                  setCurrentAppRef={setCurrentAppRef}
                />
              </DeviceScreenInner>
            </DeviceScreen>
          </DeviceScreenWrapper>
        </Device>
      </DeviceWrapper>
    </IOSGuiAppStyles>
  );
};

IOSGuiApp.propTypes = {
  orientation: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  deviceType: PropTypes.any,
  color: PropTypes.any,
  apps: PropTypes.any,
  homeApps: PropTypes.any,
};

export default IOSGuiApp;
