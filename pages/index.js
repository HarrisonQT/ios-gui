import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-extraneous-dependencies
import Iframe from 'react-iframe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhoneAlt,
  faComment,
  faVideo,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import IOSGui from '../components/IOSGui';
import { COLORS, DEVICES } from '../lib/constants';
import { IOS_APPS } from '../lib/iosApps.js';
import AppIcon from '../components/AppIcon';

const HomeStyles = styled.div`
  height: 100%;
  width: 100%;
  .row {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .left,
    .right {
      height: 100%;
      width: 100%;
      min-height: 600px;
      height: 400px;
      padding: 20px;
      display: flex;
      justify-content: center;
      justify-items: space-around;
    }
    & > * {
      height: 100%;
      flex-basis: 49%;
      width: 100%;
      @media (max-width: 600px) {
        flex-basis: 100%;
      }
    }
  }
`;

const TestApp = styled.div`
  width: 100%;
  height: 100%;
  &.test1 {
    background-image: repeating-linear-gradient(
        0deg,
        rgba(246, 250, 254, 0.12) 0px,
        rgba(246, 250, 254, 0.12) 55px,
        transparent 55px,
        transparent 110px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(246, 250, 254, 0.12) 0px,
        rgba(246, 250, 254, 0.12) 55px,
        transparent 55px,
        transparent 110px
      ),
      linear-gradient(90deg, rgb(112, 207, 251), rgb(112, 207, 251));
  }
  &.test2 {
    background-image: linear-gradient(
        217deg,
        rgba(233, 233, 233, 0.04) 0%,
        rgba(233, 233, 233, 0.04) 9%,
        rgba(203, 203, 203, 0.04) 9%,
        rgba(203, 203, 203, 0.04) 18%,
        rgba(213, 213, 213, 0.04) 18%,
        rgba(213, 213, 213, 0.04) 61%,
        rgba(4, 4, 4, 0.04) 61%,
        rgba(4, 4, 4, 0.04) 100%
      ),
      linear-gradient(
        213deg,
        rgba(54, 54, 54, 0.04) 0%,
        rgba(54, 54, 54, 0.04) 37%,
        rgba(205, 205, 205, 0.04) 37%,
        rgba(205, 205, 205, 0.04) 61%,
        rgba(216, 216, 216, 0.04) 61%,
        rgba(216, 216, 216, 0.04) 75%,
        rgba(103, 103, 103, 0.04) 75%,
        rgba(103, 103, 103, 0.04) 100%
      ),
      linear-gradient(
        304deg,
        rgba(127, 127, 127, 0.04) 0%,
        rgba(127, 127, 127, 0.04) 5%,
        rgba(199, 199, 199, 0.04) 5%,
        rgba(199, 199, 199, 0.04) 36%,
        rgba(103, 103, 103, 0.04) 36%,
        rgba(103, 103, 103, 0.04) 86%,
        rgba(183, 183, 183, 0.04) 86%,
        rgba(183, 183, 183, 0.04) 100%
      ),
      linear-gradient(90deg, rgb(158, 51, 1), rgb(235, 10, 62));
  }
  &.test3 {
    background-image: linear-gradient(
        0deg,
        rgba(85, 9, 165, 0.2) 0%,
        rgba(85, 9, 165, 0.2) 16.667%,
        rgba(62, 50, 198, 0.2) 16.667%,
        rgba(62, 50, 198, 0.2) 33.334%,
        rgba(39, 91, 231, 0.2) 33.334%,
        rgba(39, 91, 231, 0.2) 50.001%,
        rgba(50, 70, 214, 0.2) 50.001%,
        rgba(50, 70, 214, 0.2) 66.668%,
        rgba(73, 29, 181, 0.2) 66.668%,
        rgba(73, 29, 181, 0.2) 83.335%,
        rgba(27, 111, 247, 0.2) 83.335%,
        rgba(27, 111, 247, 0.2) 100.002%
      ),
      linear-gradient(
        22.5deg,
        rgba(85, 9, 165, 0.2) 0%,
        rgba(85, 9, 165, 0.2) 16.667%,
        rgba(62, 50, 198, 0.2) 16.667%,
        rgba(62, 50, 198, 0.2) 33.334%,
        rgba(39, 91, 231, 0.2) 33.334%,
        rgba(39, 91, 231, 0.2) 50.001%,
        rgba(50, 70, 214, 0.2) 50.001%,
        rgba(50, 70, 214, 0.2) 66.668%,
        rgba(73, 29, 181, 0.2) 66.668%,
        rgba(73, 29, 181, 0.2) 83.335%,
        rgba(27, 111, 247, 0.2) 83.335%,
        rgba(27, 111, 247, 0.2) 100.002%
      ),
      linear-gradient(
        157.5deg,
        rgba(85, 9, 165, 0.2) 0%,
        rgba(85, 9, 165, 0.2) 16.667%,
        rgba(62, 50, 198, 0.2) 16.667%,
        rgba(62, 50, 198, 0.2) 33.334%,
        rgba(39, 91, 231, 0.2) 33.334%,
        rgba(39, 91, 231, 0.2) 50.001%,
        rgba(50, 70, 214, 0.2) 50.001%,
        rgba(50, 70, 214, 0.2) 66.668%,
        rgba(73, 29, 181, 0.2) 66.668%,
        rgba(73, 29, 181, 0.2) 83.335%,
        rgba(27, 111, 247, 0.2) 83.335%,
        rgba(27, 111, 247, 0.2) 100.002%
      ),
      linear-gradient(90deg, rgb(62, 62, 62), rgb(101, 101, 101));
  }
  &.test4 {
    background-image: repeating-linear-gradient(
      135deg,
      rgb(201, 122, 81) 0px,
      rgb(201, 122, 81) 19px,
      rgb(179, 61, 37) 19px,
      rgb(179, 61, 37) 122px,
      rgb(223, 183, 125) 122px,
      rgb(223, 183, 125) 206px
    );
  }
  &.test {
    background-color: white;
  }
`;

const Home = () => {
  function generateRandomGradient() {
    const randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
    const angle = Math.floor(Math.random() * 360).toString();
    const gradient = `linear-gradient(${angle}deg, #${randomColor1} 0%, #${randomColor2} 100%)`;
    return gradient;
  }
  function generateRandomApp() {
    const gradient = generateRandomGradient();
    return (
      <div
        style={{ background: gradient, height: '100%', width: '100%' }}
      ></div>
    );
  }
  IOS_APPS.map(app => (app.content = generateRandomApp()));
  const FA_ICONS = {
    phone: (
      <FontAwesomeIcon
        icon={faPhoneAlt}
        style={{ height: '60%', width: '60%' }}
      />
    ),
    comment: (
      <FontAwesomeIcon
        icon={faComment}
        style={{ height: '60%', width: '70%' }}
      />
    ),
    video: (
      <FontAwesomeIcon icon={faVideo} style={{ height: '60%', width: '67%' }} />
    ),
    camera: (
      <FontAwesomeIcon
        icon={faCamera}
        style={{ height: '60%', width: '60%' }}
      />
    ),
  };
  const GRADIENTS = {
    green: 'linear-gradient(#86fe65 0%, #06d315 100%)',
    gray:
      'linear-gradient(-180deg, rgba(255, 255, 255, 0.5) 0%, rgba(0, 0, 0, 0.4) 40%) rgb(201, 204, 211)',
  };
  const ICONS = {
    phone: <AppIcon svg={FA_ICONS.phone} background={GRADIENTS.green} />,
    message: <AppIcon svg={FA_ICONS.comment} background={GRADIENTS.green} />,
    facetime: <AppIcon svg={FA_ICONS.video} background={GRADIENTS.green} />,
    camera: <AppIcon svg={FA_ICONS.camera} background={GRADIENTS.gray} />,
    angryramen: (
      <AppIcon
        svg={
          <img
            src="http://www.angryramen.com/static/angry-ramen-logo-only-bowl.svg"
            alt="Angry Ramen"
            style={{ height: '80%', width: '80%' }}
          />
        }
        background="white"
      />
    ),
  };
  const APPS = {
    phone: {
      title: 'Phone',
      icon: ICONS.phone,
      content: '',
    },
    message: {
      title: 'iMessage',
      icon: ICONS.message,
      content: '',
    },
    facetime: {
      title: 'FaceTime',
      icon: ICONS.facetime,
      content: '',
    },
    camera: {
      title: 'FaceTime',
      icon: ICONS.camera,
      content: '',
    },
  };

  const apps1 = [
    {
      title: 'Angry Ramen',
      icon: ICONS.angryramen,
      content: (
        <TestApp className="test">
          <Iframe
            url="http://www.angryramen.com/"
            width="100%"
            height="100%"
            id="myId"
            display="initial"
            position="relative"
          />
        </TestApp>
      ),
    },
    APPS.message,
    APPS.facetime,
    APPS.camera,
  ];
  const homeApps1 = [
    { icon: ICONS.phone, content: <TestApp className="test1"></TestApp> },
  ];
  const apps2 = [...IOS_APPS.slice(0, 5)];
  const homeRowApps2 = [...IOS_APPS.slice(5, 9)];
  const apps3 = [...IOS_APPS.slice(9, 13)];
  const homeRowApps3 = [...IOS_APPS.slice(13, 17)];
  const apps4 = [...IOS_APPS.slice(17, 21)];
  const homeRowApps4 = [...IOS_APPS.slice(21, 25)];

  return (
    <HomeStyles>
      <div className="row">
        <div className="left">
          <IOSGui
            orientation="portrait"
            color={COLORS.black}
            deviceType={DEVICES.ipad['2017']}
            apps={apps1}
            homeApps={homeApps1}
          />
        </div>
        <div className="right">
          <IOSGui
            orientation="landscape"
            deviceType={DEVICES.ipad['2017']}
            apps={apps2}
            homeApps={homeRowApps2}
          />
        </div>
      </div>
      <div className="row">
        <div className="left">
          <IOSGui
            orientation="portrait"
            color={COLORS.black}
            deviceType={DEVICES.iphone['8plus']}
            apps={apps3}
            homeApps={homeRowApps3}
          />
        </div>
        <div className="right">
          <IOSGui
            orientation="landscape"
            deviceType={DEVICES.iphone['8plus']}
            apps={apps4}
            homeApps={homeRowApps4}
          />
        </div>
      </div>
    </HomeStyles>
  );
};

export default Home;
