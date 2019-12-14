import PropTypes from 'prop-types';

export const AppGridPropType = PropTypes.shape({
  iphone: PropTypes.shape({
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    rotatable: PropTypes.bool.isRequired,
    size: PropTypes.shape({
      pixels: PropTypes.number.isRequired,
    }),
  }),
  ipad: PropTypes.shape({
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    rotatable: PropTypes.bool.isRequired,
    size: PropTypes.shape({
      pixels: PropTypes.number.isRequired,
    }),
  }),
});

export const DeviceTypePropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  appGrid: AppGridPropType,
  display: PropTypes.shape({
    pixels: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      statusBar: PropTypes.number.isRequired,
      navigationBar: PropTypes.number.isRequired,
    }),
    inches: PropTypes.shape({
      diagonal: PropTypes.number.isRequired,
      aspectRatioHeight: PropTypes.number.isRequired,
      aspectRatioWidth: PropTypes.number.isRequired,
    }),
  }),
  size: PropTypes.shape({
    inches: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      homeButtonDiameter: PropTypes.number.isRequired,
      webcamDiameter: PropTypes.number.isRequired,
      receiver: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
      }),
      topHardware: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
      }),
    }),
  }),
});

export const AppPropTypes = PropTypes.shape({
  content: PropTypes.object.isRequired,
  fullScreenRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(Element),
  ]),
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  ref: PropTypes.shape({
    current: PropTypes.any,
  }),
});

export const AppsPropTypes = PropTypes.arrayOf(AppPropTypes);

export const CurrentAppRefsPropTypes = PropTypes.shape({
  currentAppRef: PropTypes.instanceOf(Element),
  deviceScreenRef: PropTypes.instanceOf(Element),
});

export const DevicePropTypes = PropTypes.shape({
  appGrid: PropTypes.shape({
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    rotatable: PropTypes.bool.isRequired,
    size: PropTypes.shape({
      pixels: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  deviceScreenRef: PropTypes.object,
  display: PropTypes.shape({
    inches: PropTypes.shape({
      aspectRatioHeight: PropTypes.number.isRequired,
      aspectRatioWidth: PropTypes.number.isRequired,
      diagonal: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  ratios: PropTypes.shape({
    bezel: PropTypes.shape({
      side: PropTypes.number.isRequired,
      topDown: PropTypes.number.isRequired,
    }).isRequired,
    display: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
    topHardware: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
    receiver: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
    appSize: PropTypes.number.isRequired,
    homeButtonDiameter: PropTypes.number.isRequired,
    navigationBar: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    statusBar: PropTypes.number.isRequired,
    webcamDiameter: PropTypes.number.isRequired,
  }).isRequired,
  size: PropTypes.shape({
    inches: PropTypes.shape({
      height: PropTypes.number.isRequired,
      homeButtonDiameter: PropTypes.number.isRequired,
      topHardware: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
      }).isRequired,
      webcamDiameter: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
    pixels: PropTypes.shape({
      diagonal: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      homeButtonDiameter: PropTypes.number.isRequired,
      topHardware: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
      }).isRequired,
      webcamDiameter: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
  }).isRequired,
});
