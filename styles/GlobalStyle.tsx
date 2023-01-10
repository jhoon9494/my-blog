import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ themeColor: string | false | null }>`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }


  html{
    color-scheme: ${({ themeColor }) => (themeColor === 'dark' ? 'dark' : 'light')};
    background-color: ${({ themeColor }) => (themeColor === 'dark' ? '#222' : 'white')};
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
    color: ${({ themeColor }) => (themeColor === 'dark' ? 'white' : 'black')};
  }

  .navTheme {
    background-color: ${({ themeColor }) => (themeColor === 'dark' ? '#222' : 'white')};
  }

`;

export default GlobalStyle;
