import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HOME_BUTTON_ACTIVE = 'homeButtonActive';
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
const Hardware = ({ orientation, device, currentAppRefs }) => {
  const homeButtonRef = useRef(null);
  function triggerHomeButton(ref) {
    ref.current.classList.add(HOME_BUTTON_ACTIVE);
    if (
      currentAppRefs.currentFullscreenRef !== null &&
      currentAppRefs.currentFullscreenRef.classList.contains(
        'fullScreenAppActive'
      )
    ) {
      const refCoords = currentAppRefs.currentAppRef.getBoundingClientRect();
      const deviceScreenRefCoords = device.deviceScreenRef.current.getBoundingClientRect();
      const coords = {
        top: refCoords.top - deviceScreenRefCoords.top,
        left: refCoords.left - deviceScreenRefCoords.left,
        bottom: refCoords.bottom - deviceScreenRefCoords.bottom,
        right: refCoords.right - deviceScreenRefCoords.right,
      };
      currentAppRefs.currentFullscreenRef.classList.remove(
        'fullScreenAppActive'
      );
      currentAppRefs.currentFullscreenRef.style.setProperty(
        'width',
        `var(--appWidth)`
      );
      currentAppRefs.currentFullscreenRef.style.setProperty(
        'height',
        `var(--appHeight)`
      );
      currentAppRefs.currentFullscreenRef.style.left = `${coords.left}px`;
      currentAppRefs.currentFullscreenRef.style.top = `${coords.top}px`;
      currentAppRefs.currentFullscreenRef.style.right = `${coords.right}px`;
      currentAppRefs.currentFullscreenRef.style.bottom = `${coords.bottom}px`;
      currentAppRefs.currentFullscreenRef.style.transform = ``;
    }
    setTimeout(() => {
      if (ref.current.classList.contains(HOME_BUTTON_ACTIVE)) {
        ref.current.classList.remove(HOME_BUTTON_ACTIVE);
      }
    }, 200);
  }
  return (
    <DeviceHardware className="DeviceHardware" orientation={orientation}>
      <div className="deviceInterface topHardware">
        <span className="webcam"></span>
        {device.size.inches.receiver && <span className="receiver"></span>}
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
  );
};

Hardware.propTypes = {
  orientation: PropTypes.any,
  device: PropTypes.any,
  currentFullscreenRef: PropTypes.any,
  currentAppRefs: PropTypes.any,
};

export default Hardware;
