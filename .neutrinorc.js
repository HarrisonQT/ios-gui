const {basename, join} = require('path');
const { Neutrino
} = require('neutrino');
module.exports = {
  use: [
    ['@neutrinojs/airbnb',
    { eslint: {
      rules: {
        // 'react/forbid-prop-types': 'off',
        // 'react/require-default-props': 'off',
      }
    }}
    ],
    '@neutrinojs/react-components',
    '@neutrinojs/jest'
  ],
  optimization: {
    minimize: false
  }
};
