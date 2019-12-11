const NAME = 'IOS Gui';
const SCREEN_WIDTHS = {
  superMax: '1200px',
  max: '1000px',
  medium: '768px',
  small: '576px',
  extraSmall: '375px',
};

const COLORS = {
  white: 'rgb(249,246,239)',
  black: 'rgb(31,32,32)',
};

const APP_GRID = {
  iphone: {
    columns: 4,
    rows: 6,
    rotatable: false,
    size: {
      pixels: 66,
    },
  },
  ipad: {
    columns: 4,
    rows: 6,
    rotatable: true,
    size: {
      pixels: 44,
    },
  },
};

const DEVICES = {
  iphone: {
    '8plus': {
      // https://support.apple.com/kb/sp768?locale=en_US
      name: 'iPhone',
      appGrid: APP_GRID.iphone,
      display: {
        pixels: {
          height: 1920,
          width: 1080,
          statusBar: 40,
          navigationBar: 88,
        },
        inches: {
          diagonal: 5.5,
          aspectRatioHeight: 16,
          aspectRatioWidth: 9,
        },
      },
      size: {
        inches: {
          height: 6.24,
          width: 3.07,
          homeButtonDiameter: 0.4291339, // 10.9 millimeters
          webcamDiameter: 0.123622, // 3.14 millimeters
          receiver: {
            // height: 0.0472441, // 1.2 millimeters
            height: 0.09, // 1.2 millimeters
            width: 0.56181102, // 14.27 millimeters
          },
          topHardware: {
            height: 0.123622, // webcam
            width: 0.87086614, // 22.12 millimeters 46.18-(25.61-3.1/2)
          },
        },
      },
    },
  },
  ipad: {
    '2017': {
      // https://support.apple.com/kb/SP751?locale=en_US
      name: 'iPad',
      appGrid: APP_GRID.ipad,
      display: {
        pixels: {
          height: 2048,
          width: 1536,
          statusBar: 40,
          navigationBar: 88,
        },
        inches: {
          diagonal: 9.7,
          aspectRatioHeight: 4,
          aspectRatioWidth: 3,
        },
      },
      size: {
        inches: {
          height: 9.4,
          width: 6.6,
          homeButtonDiameter: 0.5748031, // 14.6 millimeters
          // webcamDiameter: 0.09645669, // 2.45 millimeters
          webcamDiameter: 0.2, // 2.45 millimeters
          topHardware: {
            height: 0.2, // webcam
            width: 0.2, // webcam
          },
        },
      },
    },
  },
};

export { NAME, SCREEN_WIDTHS, DEVICES, COLORS };
