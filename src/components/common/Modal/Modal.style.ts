import styled from "styled-components";

export const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
`;
/* ${(props) => {
    switch (props.ModalType) {
    case "":
      
      break;
  
    default:
      break;
  })}} */

export const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;

  background-color: #ffffff;
  border-radius: 20px;
  /* border: 2px solid black; */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
`;
