import React, { useRef } from 'react';
import BaseModal from '../BaseModal';
import useClickOutside from 'hooks/useClickOutside';


interface ModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({ onConfirm, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, ()=> onClose())

  return (
    <BaseModal>
      <div ref={ref} style={{border:'1px solid #ccc',padding:'30px'}}>
        <p>Modal</p>
        <button onClick={() => onConfirm()}>Confirm</button>
        <button onClick={() => onClose()}>Cancel</button>
      </div>
    </BaseModal>
  );
};

export default ConfirmModal;
