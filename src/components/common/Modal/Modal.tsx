import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useModalStore from "store/useModalStore";
import * as Styled from "./Modal.style";
// import { closeModal } from "redux/modules";

interface IProps {
  children: React.ReactNode;
  closeTarget: string;
}

const Modal = ({ children, closeTarget }: IProps) => {
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
    <Styled.Outer ref={modalRef}>
      <Styled.Inner>{children}</Styled.Inner>
    </Styled.Outer>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
