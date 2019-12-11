import React from 'react';
import styled from 'styled-components';
import IOSGui from '../components/IOSGui';
import { COLORS, DEVICES } from '../lib/constants';

const HomeStyles = styled.div`
  height: 100%;
  width: 100%;
  /* padding: 20px; */
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
`;

const Home = () => {
  const apps1 = [
    { title: 'title', icon: '', app: <TestApp className="test1"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test2"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test3"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test4"></TestApp> },
  ];
  const homeApps1 = [
    { icon: '', app: <TestApp className="test1"></TestApp> },
    { icon: '', app: <TestApp className="test2"></TestApp> },
    { icon: '', app: <TestApp className="test3"></TestApp> },
    { icon: '', app: <TestApp className="test4"></TestApp> },
  ];
  const apps2 = [
    { title: 'title', icon: '', app: <TestApp className="test1"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test2"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test3"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test4"></TestApp> },
  ];
  const homeApps2 = [
    { icon: '', app: <TestApp className="test1"></TestApp> },
    { icon: '', app: <TestApp className="test2"></TestApp> },
    { icon: '', app: <TestApp className="test3"></TestApp> },
    { icon: '', app: <TestApp className="test4"></TestApp> },
  ];
  const apps3 = [
    { title: 'title', icon: '', app: <TestApp className="test1"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test2"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test3"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test4"></TestApp> },
  ];
  const homeApps3 = [
    { icon: '', app: <TestApp className="test1"></TestApp> },
    { icon: '', app: <TestApp className="test2"></TestApp> },
    { icon: '', app: <TestApp className="test3"></TestApp> },
    { icon: '', app: <TestApp className="test4"></TestApp> },
  ];
  const apps4 = [
    { title: 'title', icon: '', app: <TestApp className="test1"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test2"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test3"></TestApp> },
    { title: 'title', icon: '', app: <TestApp className="test4"></TestApp> },
  ];
  const homeApps4 = [
    { icon: '', app: <TestApp className="test1"></TestApp> },
    { icon: '', app: <TestApp className="test2"></TestApp> },
    { icon: '', app: <TestApp className="test3"></TestApp> },
    { icon: '', app: <TestApp className="test4"></TestApp> },
  ];
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
            homeApps={homeApps2}
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
            homeApps={homeApps3}
          />
        </div>
        <div className="right">
          <IOSGui
            orientation="landscape"
            deviceType={DEVICES.iphone['8plus']}
            apps={apps4}
            homeApps={homeApps4}
          />
        </div>
      </div>
    </HomeStyles>
  );
};

export default Home;
