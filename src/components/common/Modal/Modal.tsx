import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useModalStore, { IModalStatus } from "store/useModalStore";
import * as Styled from "./Modal.style";

interface IProps {
  children: React.ReactNode;
  closeTarget: keyof IModalStatus;
  modalType?: string;
}

const Modal = (props: IProps) => {
  const { children, closeTarget, modalType, ...rest } = props;
  const modalRef = useRef(null);
  const { closeModal } = useModalStore(state => state);

  const clickOutside = (event: MouseEvent): void => {
    if (modalRef.current === event.target) closeModal(closeTarget);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <Styled.Outer {...rest} ref={modalRef}>
      <Styled.Inner {...rest}>{children}</Styled.Inner>
    </Styled.Outer>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
