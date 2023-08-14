import { Button, Space, Typography } from "antd";
import useClickOutside from "hooks/useClickOutside";
import React, { ReactNode, useRef } from "react";
import BaseModal from "../BaseModal";
import * as S from "../Modal.style";

const { Title } = Typography;
interface ModalProps {
  onClose: () => void;
  title?: string;
  content?: ReactNode;
}

const AlertModal: React.FC<ModalProps> = ({ title = "Alert", content, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => onClose());

  return (
    <BaseModal>
      <S.ModalWrapper ref={ref}>
        <Title level={4} style={{ marginBottom: "6px" }}>
          {title}
        </Title>
        {content && <div>{content}</div>}
        <Space direction="vertical" style={{ display: "flex", alignItems: "flex-end" }}>
          <Button type="primary" onClick={() => onClose()}>
            확인
          </Button>
        </Space>
      </S.ModalWrapper>
    </BaseModal>
  );
};

export default AlertModal;
