import useClickOutside from "hooks/useClickOutside";
import React, { useRef } from "react";
import BaseModal from "../BaseModal";

interface ModalProps {
  onClose: () => void;
}

const AlertModal: React.FC<ModalProps> = ({ onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => onClose());

  return (
    <BaseModal>
      <div ref={ref} style={{ border: "1px solid #ccc", padding: "30px" }}>
        <p>Alert Modal</p>
        <button onClick={() => onClose()}>Confirm</button>
      </div>
    </BaseModal>
  );
};

export default AlertModal;
