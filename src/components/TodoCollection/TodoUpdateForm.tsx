import { Button, DatePicker, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useTodo } from "hooks";
import { useDialog } from "hooks/useDialog";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { ITodo } from "supabase/database.types";
import SelectTags from "./SelectTags";

interface Props {
  item: ITodo;
  onConfirm: () => void;
  onClose: () => void;
}

const TodoUpdateForm: React.FC<Props> = ({ item, onConfirm, onClose }) => {
  const { id, email, isDone, important, title, content, deadLineDate } = item;
  const [tag, setTag] = useState<string[]>([]);
  const initialValue = { email, isDone, important, title, content, tag, deadLineDate };

  const [inputValue, setInputValue] = useState(initialValue);
  const { todoUpdateMutation, todoDeleteMutation } = useTodo();

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onDayChange = (event: dayjs.Dayjs | null) => {
    if (event) {
      const deadLineDate = event.format().split("T")[0];
      setInputValue({ ...inputValue, deadLineDate });
    }
  };

  useEffect(() => {
    setInputValue({ ...inputValue, tag: tag });
  }, [tag, setTag]);

  const onSubmitHandler = () => {
    todoUpdateMutation.mutate({ id, inputValue });
    setInputValue({ ...initialValue, deadLineDate });
    onConfirm();
  };

  const { openDialog } = useDialog();
  const onClickDeleteHandler = async () => {
    if (await openDialog({ type: "confirm", title: "삭제 하시겠습니까?" })) {
      todoDeleteMutation.mutate(id);
      onClose();
    }
  };

  const register = (name: string, value: string, maxLength: number) => ({
    name,
    value,
    onChange,
    maxLength,
    showCount: true
  });

  return (
    <StFormBackground>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        style={{ width: 400, paddingLeft: "18px" }}
        size="middle"
        onFinish={onSubmitHandler}
      >
        <Form.Item
          label="제목"
          name="title"
          initialValue={inputValue.title}
          rules={[{ required: true, message: "제목을 입력해주세요!" }]}
        >
          <Input
            {...register("title", inputValue.title, 20)}
            defaultValue={inputValue.title}
            placeholder="제목을 입력하세요"
          />
        </Form.Item>
        <Form.Item
          label="내용"
          name="content"
          initialValue={inputValue.content}
          rules={[{ required: true, message: "내용을 입력해주세요!" }]}
        >
          <TextArea
            {...register("content", inputValue.content, 20)}
            defaultValue={inputValue.content}
            style={{ height: 50, resize: "none" }}
            placeholder="내용을 입력하세요"
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 15, offset: 3 }}
          name="range-picker"
          label="일정"
          initialValue={dayjs(inputValue.deadLineDate)}
          rules={[{ required: true, message: "내용을 입력해주세요!" }]}
        >
          <Space direction="vertical" size={12}>
            <DatePicker
              name="deadline"
              bordered={false}
              value={dayjs(inputValue.deadLineDate)}
              defaultValue={dayjs(inputValue.deadLineDate)}
              onChange={event => onDayChange(event)}
            />
          </Space>
        </Form.Item>

        <Form.Item label="태그">
          <SelectTags setTag={setTag} item={item} />
        </Form.Item>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "18px",
            marginBottom: "0"
          }}
        >
          <Space size={"middle"}>
            <Button type="primary" danger onClick={onClickDeleteHandler}>
              삭제
            </Button>
            <Button type="default" onClick={onClose}>
              닫기
            </Button>
            <Button type="primary" htmlType="submit">
              저장
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </StFormBackground>
  );
};

export default TodoUpdateForm;

const StFormBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  height: 370px;

  margin-top: 50px;

  background-color: #fff;
  border-radius: 20px;
`;
