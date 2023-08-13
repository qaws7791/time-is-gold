import { Button, Form, Input, Space, Typography } from "antd";
import useClickOutside from "hooks/useClickOutside";
import React, { ReactNode, useRef } from "react";
import BaseModal from "../BaseModal";
import * as S from "../Modal.style";

const { Title } = Typography;
interface ModalProps {
  onConfirm: (inputText: string) => void;
  onClose: () => void;
  title?: string;
  content?: ReactNode;
}

type FieldType = {
  inputText?: string;
};

const PromptModal: React.FC<ModalProps> = ({
  title = "Prompt Modal",
  content,
  onConfirm,
  onClose
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => onClose());

  const onFinish = (values: any) => {
    onConfirm(values.inputText);
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <BaseModal>
      <S.ModalWrapper ref={ref}>
        <Title level={4} style={{ marginBottom: "6px" }}>
          {title}
        </Title>
        {content && <div>{content}</div>}
        <Form
          name="basic"
          initialValues={{ inputText: "" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType> name="inputText">
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Space direction="horizontal" style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => onClose()}>취소</Button>
            <Button type="primary" htmlType="submit">
              확인
            </Button>
          </Space>
        </Form>
      </S.ModalWrapper>
    </BaseModal>
  );
};

export default PromptModal;
