import { Button, DatePicker, Form, Input, Space } from "antd";
import dayjs from "dayjs";
import { useTodo } from "hooks";
import { useEffect, useState } from "react";
import { useCurrentUser } from "store";
import { styled } from "styled-components";
import SelectTags from "./SelectTags";
import { whatIsToday } from "./today";

const { TextArea } = Input;

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const TodoForm: React.FC<Props> = ({ onConfirm, onClose }) => {
  const [tag, setTag] = useState<string[]>([]);

  const { currentUserEmail: email } = useCurrentUser();
  const initialValue = {
    email,
    isDone: false,
    important: false,
    title: "",
    content: "",
    tag,
    deadLineDate: whatIsToday()
  };

  const [inputValue, setInputValue] = useState(initialValue);
  const { todoPostMutation } = useTodo();

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
    todoPostMutation.mutate(inputValue);
    setInputValue({ ...initialValue, deadLineDate: whatIsToday() });
    onConfirm();
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
        style={{ width: 400, paddingLeft: "15px" }}
        size="middle"
        onFinish={onSubmitHandler}
      >
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: "제목을 입력해주세요!" }]}
        >
          <Input {...register("title", inputValue.title, 20)} placeholder="제목을 입력하세요" />
        </Form.Item>
        <Form.Item
          label="내용"
          name="content"
          rules={[{ required: true, message: "내용을 입력해주세요!" }]}
        >
          <TextArea
            {...register("content", inputValue.content, 35)}
            style={{ height: 50, resize: "none" }}
            placeholder="내용을 입력하세요"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 15, offset: 3 }} name="range-picker" label="일정">
          <Space direction="vertical" size={12}>
            <DatePicker
              name="deadLineDate"
              bordered={false}
              defaultValue={dayjs(inputValue.deadLineDate)}
              onChange={e => onDayChange(e)}
            />
          </Space>
        </Form.Item>

        <Form.Item label="태그">
          <SelectTags setTag={setTag} />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center", marginBottom: "0" }}>
          <Space size={"middle"}>
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
export default TodoForm;

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
