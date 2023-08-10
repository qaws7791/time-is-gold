import React from "react";
import styled from "styled-components";

interface ModalProps {
  children: React.ReactNode;
}

const ModalWrapper = styled.div`
  position: fixed;
  /* border: 1px solid red; */
  /* top: 10%; */
  /* left: 50%; */
  /* transform: translateX(-50%); */

  // 지은 임의 변경
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  text-align: center;
`;

const BaseModal: React.FC<ModalProps> = ({ children, ...props }) => {
  return <ModalWrapper {...props}>{children}</ModalWrapper>;
};

export default BaseModal;
