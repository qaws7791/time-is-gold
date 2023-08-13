import { Button, Space, Typography } from "antd";
import useClickOutside from "hooks/useClickOutside";
import React, { ReactNode, useRef } from "react";
import BaseModal from "../BaseModal";
import * as S from "../Modal.style";

const { Title } = Typography;
interface ModalProps {
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  content?: ReactNode;
}

const ConfirmModal: React.FC<ModalProps> = ({
  title = "Confirm Modal",
  content,
  onConfirm,
  onClose
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => onClose());

  return (
    <BaseModal>
      <S.ModalWrapper ref={ref}>
        <Title level={4} style={{ marginBottom: "6px" }}>
          {title}
        </Title>
        {content && <div>{content}</div>}
        <Space direction="horizontal" style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => onClose()}>취소</Button>
          <Button type="primary" onClick={() => onConfirm()}>
            확인
          </Button>
        </Space>
      </S.ModalWrapper>
    </BaseModal>
  );
};

export default ConfirmModal;
