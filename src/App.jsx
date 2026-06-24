import React, { useRef } from 'react';
import styled from 'styled-components';
import { Layout, Hero, About, Skills, Featured, Projects, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const App = () => {
  const mainRef = useRef();

  return (
    <Layout mainRef={mainRef}>
      <StyledMainContainer className="fillHeight" ref={mainRef}>
        <Hero />
        <About />
        <Skills />
        <Featured />
        <Projects />
        <Contact />
      </StyledMainContainer>
    </Layout>
  );
};

export default App;
