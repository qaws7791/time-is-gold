import React from "react";

import { createPortal } from "react-dom";
import styled from "styled-components";
import { transpile } from "typescript";

interface ModalProps {
  children?: React.ReactNode;
  // type?: "schedule";
  name?: string | undefined;
}

const ModalWrapper = styled.div<{ name?: string }>`
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
  background-color: ${({ name }) => {
    if (name === "tagChanger") {
      return "transparent";
    } else {
      return "rgba(0, 0, 0, 0.5)";
    }
  }};
  display: flex;
  justify-content: center;
  text-align: center;
  z-index: 5;
`;

const BaseModal: React.FC<ModalProps> = ({ children, ...props }) => {
  console.log(props);
  return <ModalWrapper {...props}>{children}</ModalWrapper>;
};
export default BaseModal;
