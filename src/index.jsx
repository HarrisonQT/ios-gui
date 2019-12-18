
import { render } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import Iframe from 'react-iframe';
import IOSGui from './components/IOSGui';
import { COLORS, DEVICES } from './components/IOSGui/lib/constants';
import AppIcon from './components/IOSGui/AppIcon';

const root = document.getElementById('root');
root.style.cssText = `
  height: 600px;
  width: 600px;
`;

const ICONS = {
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
const apps = [
  {
    title: 'Angry Ramen',
    icon: ICONS.angryramen,
    content: (
      <Iframe
        url="http://www.angryramen.com/"
        width="100%"
        height="100%"
        id="myId"
        display="initial"
        position="relative"
      />
    ),
  },
];

render(
  (
    <IOSGui
      orientation="portrait"
      color={COLORS.black}
      deviceType={DEVICES.ipad['2017']}
      apps={apps}
    />
  ), root,
);
