import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const styled = { createGlobalStyle };
const GlobalStyle = styled.createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    color: #000000;
    -webkit-tap-highlight-color: transparent;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input::selection,
  ::selection {
    background-color: #000000;
    color: #ffffff;
  }

  button {
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }
`;

export default GlobalStyle;
