import { ReactNode } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import GlobalStyle from '../styles/GlobalStyle';
import useTheme from '../hooks/useTheme';

const Container = styled.div`
  max-width: 935px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Line = styled.hr`
  width: 100%;
`;

function Layout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <GlobalStyle themeColor={theme} />
      <Container>
        <Nav theme={theme} setTheme={setTheme} />
        <Line />
        {children}
      </Container>
    </>
  );
}

export default Layout;
