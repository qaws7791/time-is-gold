import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface ModalProps {
  children: React.ReactNode;
  // type?: "schedule";
}

const ModalWrapper = styled.div`
  position: fixed;
  /* border: 1px solid red; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1000;
`;

const BaseModal = ({ children, ...props }: ModalProps) => {
  return createPortal(
    <ModalWrapper {...props}>{children}</ModalWrapper>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default BaseModal;
