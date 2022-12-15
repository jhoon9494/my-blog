import { ReactNode } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import GlobalStyle from '../styles/GlobalStyle';
import useTheme from '../hooks/useTheme';

const Container = styled.div`
  max-width: 935px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

function Layout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <GlobalStyle themeColor={theme} />
      <Container>
        <Nav theme={theme} setTheme={setTheme} />
        {children}
      </Container>
    </>
  );
}

export default Layout;
