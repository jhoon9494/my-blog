import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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
    color-scheme: ${({ theme }) => theme.scheme};
    background-color: ${({ theme }) => theme.color};
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
    color: ${({ theme }) => theme.font};
  }

  .navTheme {
    background-color: ${({ theme }) => theme.color};
  }

`;

export default GlobalStyle;
