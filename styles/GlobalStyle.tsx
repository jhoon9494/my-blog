import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ themeColor: string | false | null }>`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html{
    color-scheme: ${({ themeColor }) => (themeColor === 'dark' ? 'dark' : 'light')} 
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
