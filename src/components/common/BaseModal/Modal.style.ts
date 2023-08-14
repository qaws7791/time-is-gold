import { styled } from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 350px;

  margin: 0 15px;
  padding: 30px;

  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;

  @media only screen and (max-width: 600px) {
    width: 240px;
  }
`;
