import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body, #__next {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    overflow:auto;
  }
`;

export default GlobalStyles;
