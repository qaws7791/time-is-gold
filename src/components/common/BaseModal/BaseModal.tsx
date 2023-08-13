import React from "react";
import styled from "styled-components";

interface ModalProps {
  children?: React.ReactNode;
  name?: string | undefined;
}

const ModalWrapper = styled.div<{ name?: string }>`
  position: fixed;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;

  background-color: ${({ name }) => {
    if (name === "tagChanger") {
      return "transparent";
    } else {
      return "rgba(0, 0, 0, 0.5)";
    }
  }};

  text-align: center;

  z-index: 5;
`;

const BaseModal: React.FC<ModalProps> = ({ children, ...props }) => {
  return <ModalWrapper {...props}>{children}</ModalWrapper>;
};
export default BaseModal;
