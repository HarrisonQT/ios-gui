import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconStyles = styled.div`
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    max-height: 100% !important;
    max-width: 100% !important;
  }
`;
const Icon = ({ svg, background }) => (
  <IconStyles background={background}>{svg}</IconStyles>
);

Icon.propTypes = {
  svg: PropTypes.any,
  background: PropTypes.any,
};

export default Icon;
