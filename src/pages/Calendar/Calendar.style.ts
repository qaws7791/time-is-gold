import { styled } from "styled-components";

export const ColorSelect = styled.input`
  &[type="radio"] {
    appearance: none;

    width: 50px;
    height: 50px;

    background-color: ${props => props.color};
    border: max(2px, 0.1em) solid gray;
    border-radius: 50%;

    transition: border 500ms ease-in-out;
    cursor: pointer;
  }

  &[type="radio"]:checked {
    background-color: #fff;
    border: 15px solid ${props => props.color};
  }

  &[type="radio"]:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) dotted ${props => props.color};
  }

  &[type="radio"]:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  }
`;
