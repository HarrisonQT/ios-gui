import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconStyles = styled.div`
  box-sizing: border-box;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    box-sizing: border-box;
    max-height: 100% !important;
    max-width: 100% !important;
  }
`;
const Icon = ({ svg = {}, background }) => (
  <IconStyles background={background}>{svg}</IconStyles>
);

Icon.propTypes = {
  svg: PropTypes.shape({
    props: PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
      style: PropTypes.shape({
        height: PropTypes.oneOfType([PropTypes.number,
          PropTypes.string]),
        width: PropTypes.oneOfType([PropTypes.number,
          PropTypes.string]),
      }),
    }),
  }),
  background: PropTypes.string,
};
Icon.defaultProps = {
  svg: {
    props: {
      alt: '',
      src: '',
      style: {
        height: 44,
        width: 44,
      },
    },
  },
  background: '',
};

export default Icon;
