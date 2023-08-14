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

  background-color: white;

  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;

  @media only screen and (max-width: 600px) {
    width: 240px;
  }
`;
