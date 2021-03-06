/* eslint-disable no-param-reassign */
import React, { Fragment, useRef, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  calculateByDiagonal,
  calculateDiagonal,
} from './lib/calculateDimensions';
import { DEVICES, COLORS, DEV_MODE } from './lib/constants';
import Screen from './Screen';
import Hardware from './Hardware';
import { DeviceTypePropTypes, AppsPropTypes } from './lib/PropTypesValues';

const IOSGuiAppStyles = styled.div`
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 10px;
  color: white;
  height: 100%;
  width: 100%;
  position: relative;
`;

const DeviceWrapper = styled.div`
  box-sizing: border-box;
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
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.statusBar} * var(--displayWidth))`
      : `calc(${props.device.ratios.statusBar} * var(--displayHeight))`)};
  --homeButtonDiameter: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.homeButtonDiameter} * var(--height))`
      : `calc(${props.device.ratios.homeButtonDiameter} * var(--width))`)};
  --homeButtonTop: ${props =>
    (props.orientation === 'landscape'
      ? 'calc(var(--height)/2 - var(--homeButtonDiameter)/2)'
      : 'calc(var(--height) - var(--topDownBezel)/2 - var(--homeButtonDiameter)/2)')};
  --homeButtonLeft: ${props =>
    (props.orientation === 'landscape'
      ? 'calc(var(--width) - var(--sideBezel)/2 - var(--homeButtonDiameter)/2)'
      : 'calc(var(--width)/2 - var(--homeButtonDiameter)/2)')};
  --topHardwareReceiverHeight: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.receiver.height} * var(--height))`
      : `calc(${props.device.ratios.receiver.height} * var(--width))`)};
  --topHardwareReceiverWidth: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.receiver.width} * var(--height))`
      : `calc(${props.device.ratios.receiver.width} * var(--width))`)};
  --topHardwareHeight: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.topHardware.height} * var(--height))`
      : `calc(${props.device.ratios.topHardware.height} * var(--width))`)};
  --topHardwareWidth: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.topHardware.width} * var(--height))`
      : `calc(${props.device.ratios.topHardware.width} * var(--width))`)};
  --topHardwareTop: ${props =>
    (props.orientation === 'landscape'
      ? 'calc(var(--height)/2 - var(--webcamDiameter)/2)'
      : 'calc(var(--topDownBezel)/2 - var(--webcamDiameter)/2)')};
  --topHardwareLeft: ${props =>
    (props.orientation === 'landscape'
      ? 'calc(var(--sideBezel)/2 - var(--topHardwareWidth)/2)'
      : 'calc(var(--width)/2 - var(--topHardwareWidth)/2)')};
  --webcamDiameter: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.webcamDiameter} * var(--height))`
      : `calc(${props.device.ratios.webcamDiameter} * var(--width))`)};
  --receiverHeight: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.receiver.height} * var(--height))`
      : `calc(${props.device.ratios.receiver.height} * var(--width))`)};
  --receiverWidth: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.receiver.width} * var(--height))`
      : `calc(${props.device.ratios.receiver.width} * var(--width))`)};

  --appIconSize: ${props =>
    (props.orientation === 'landscape'
      ? `calc(${props.device.ratios.appSize} * var(--width))`
      : `calc(${props.device.ratios.appSize} * var(--height))`)};
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
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

function calculateDeviceDimensions(device, orientation) {
  const { height: displayHeight, width: displayWidth } = calculateByDiagonal(
    device.display.inches.aspectRatioHeight,
    device.display.inches.aspectRatioWidth,
    device.display.inches.diagonal,
  );
  device.display.inches.height = displayHeight;
  device.display.inches.width = displayWidth;
  device.display.pixels.diagonal = calculateDiagonal(
    displayHeight,
    displayWidth,
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
    (device.display.pixels.width - (device.display.pixels.width * 0.05 * 7)) / 7;
  device.size.pixels.homeButtonDiameter = deviceSizePixelHomeButtonDiameter;
  device.size.pixels.webcamDiameter = deviceSizePixelWebcamDiameter;
  device.size.pixels.topHardware = {};
  device.size.pixels.topHardware.height = deviceSizePixelTopHardwareHeight;
  device.size.pixels.topHardware.width = deviceSizePixelTopHardwareWidth;
  device.display.pixels.appSize = deviceSizePixelApp;

  device.size.pixels.diagonal = calculateDiagonal(
    deviceSizePixelHeight,
    deviceSizePixelWidth,
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
  const deviceRef = useRef(null);
  const [refs, setRefs] = useState({
    currentFullscreenRef: null,
    currentAppRef: null,
  });
  const setCurrentAppRefs = async (currentFullscreenRef, currentAppRef) => {
    setRefs({
      currentFullscreenRef,
      currentAppRef,
    });
  };
  const d = { ...deviceType };
  const device = calculateDeviceDimensions(d, orientation);

  device.deviceScreenRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width, height });
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
        {DEV_MODE &&
          <Fragment>
            <span className="deviceInterface horz" />
            <span className="deviceInterface vert" />
          </Fragment>
        }
        <Hardware
          device={device}
          orientation={orientation}
          currentAppRefs={refs}
        />
        <Device className="Device">
          <Screen
            device={device}
            orientation={orientation}
            apps={apps.slice(0, 24).filter(element => element !== undefined)}
            homeApps={homeApps.slice(0, 4).filter(element => element !== undefined)}
            setCurrentAppRefs={setCurrentAppRefs}
          />
        </Device>
      </DeviceWrapper>
    </IOSGuiAppStyles>
  );
};

IOSGuiApp.propTypes = {
  orientation: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  deviceType: DeviceTypePropTypes,
  color: PropTypes.string,
  apps: AppsPropTypes,
  homeApps: AppsPropTypes,
};
IOSGuiApp.defaultProps = {
  orientation: 'landscape',
  width: 0,
  height: 0,
  color: COLORS.white,
  deviceType: DEVICES.ipad['2017'],
  apps: Array.from({ length: 24 }),
  homeApps: Array.from({ length: 4 }),
};
export default IOSGuiApp;
