import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { NAME } from '../lib/constants';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *,  *:before, *:after {
    box-sizing: border-box;
  }
`;
const StyledPage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 1000px;
`;

const Inner = styled.div`
  height: 100%;
  width: 100%;
  padding: 0;
`;

const Page = ({ children }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{NAME}</title>
    </Head>
    <StyledPage>
      <Inner>{children}</Inner>
    </StyledPage>
    <GlobalStyle />
  </>
);

Page.propTypes = {
  children: PropTypes.any,
};

export default Page;
