import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  children: React.ReactNode;
}

const ModalWrapper = styled.div`
  position: fixed;
  /* border: 1px solid red; */
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
`

const BaseModal: React.FC<ModalProps> = ({ children,...props }) => {

  return (
    <ModalWrapper {...props}>
      {children}
    </ModalWrapper>
  );
};

export default BaseModal;
