'use client';

import { ThemeProvider } from 'styled-components';
import Layout from '../components/Layout';
import useTheme from '../hooks/useTheme';
import StyledComponentsRegistry from '../lib/registry';
import GlobalStyle from '../styles/GlobalStyle';
import { lightTheme, darkTheme } from '../styles/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <html lang="ko">
      <head />
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Layout theme={theme} setTheme={setTheme}>
              {children}
            </Layout>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
