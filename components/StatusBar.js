import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BatterySVG from './BatterySVG';
import WifiSVG from './WifiSVG';

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
const StatusBar = ({ device }) => {
  const date = new Date();
  return (
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
  );
};

StatusBar.propTypes = {
  device: PropTypes.any,
};

export default StatusBar;
