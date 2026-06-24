import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Loader, Nav, Social, Email, Footer } from '@components';
import Head from './head';
import { GlobalStyle, theme } from '@styles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <a className="skip-to-content" href="#content">
          Skip to Content
        </a>
        {isLoading ? (
          <Loader finishLoading={() => setIsLoading(false)} />
        ) : (
          <StyledContent>
            <Nav isHome={true} />
            <Social isHome={true} />
            <Email isHome={true} />
            <div id="content">
              {children}
              <Footer />
            </div>
          </StyledContent>
        )}
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
