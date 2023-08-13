import React from "react";
import styled from "styled-components";

interface ModalProps {
  children?: React.ReactNode;
  name?: string | undefined;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const BaseModal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <>
      <ModalBackground />
      <ModalWrapper {...props}>{children}</ModalWrapper>
    </>
  );
};
export default BaseModal;
