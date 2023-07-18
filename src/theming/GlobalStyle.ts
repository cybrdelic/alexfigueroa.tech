import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box; // This ensures padding does not affect width
  }

  html {
    font-size: 62.5%; // This sets 1rem to be 10px, easier for responsive typography
  }

  body {
    background: ${({ theme }) => theme?.body ?? 'rgba(0,255,0,1)'};
    color: ${({ theme }) => theme?.text ?? 'rgba(255,0,0,1)'};
    font-family: ${({ theme }) => theme?.fontFamily ?? 'Tahoma, Helvetica, Arial, Roboto, sans-serif'};
    font-size: 1.6rem; // 16px as base size
    line-height: 1.5;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: ${({ theme }) => theme?.transition ?? 'all 0.3s linear'};
  }
`
