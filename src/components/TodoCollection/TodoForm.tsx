import { Input, DatePicker, Space, Form, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { whatIsToday } from "./today";
import { postTodo } from "api/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITodoforInsert } from "supabase/database.types";
import { styled } from "styled-components";
import SelectTags from "./SelectTags";
import { getTags } from "api/tags";

const { TextArea } = Input;

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const TodoForm: React.FC<Props> = ({ onConfirm, onClose }) => {
  const now = dayjs();
  const queryClient = useQueryClient();

  // const initialValue = {
  //   title: "",
  //   content: "",
  //   deadLineDate: whatIsToday(),
  //   isDone: false,
  //   important: false
  // };
  // const [inputValue, setInputValue] = useState(initialValue);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [deadLineDate, setDeadLineDate] = useState<string | undefined>(whatIsToday());
  const [tag, setTag] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // const {name, value} = e.target}
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
    // setInputValue({...inputValue, [e.target.name]:e.target.value})
  };

  const onDayChange = (e: dayjs.Dayjs | null) => {
    const checkDate = e?.format().split("T")[0];
    setDeadLineDate(checkDate);
  };

  const todoPostMutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });

  // TODO email : auth연결하면 수정해줘야함. + tag 기능 추가하면 수정해줘야함. (현재 임의로 지정)
  const onSubmitHandler = () => {
    if (!title || !content || !deadLineDate) {
      alert("제목, 내용, 마감기한 설정은 필수입니다");
      return false;
    }
    const newTodo: ITodoforInsert = {
      email: "jieun2563@naver.com", // FIXME 현재 유저 정보 가져오기
      title,
      content,
      tag,
      deadLineDate,
      isDone: false,
      important: false
    };
    todoPostMutation.mutate(newTodo);
    setTitle("");
    setContent("");
    setDeadLineDate(whatIsToday());
    onConfirm();
  };

  const onClickCloseHandler = () => onClose();

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
        style={{ width: 350 }}
        size="middle"
        onFinish={onSubmitHandler}
      >
        <Form.Item label="제목">
          <Input {...register("title", title, 20)} placeholder="제목을 입력하세요" />
        </Form.Item>
        <Form.Item label="내용">
          <TextArea
            {...register("content", content, 35)}
            style={{ height: 50, resize: "none" }}
            placeholder="내용을 입력하세요"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 15, offset: 3 }} name="range-picker" label="일정">
          <Space direction="vertical" size={12}>
            <DatePicker
              name="deadLineDate"
              bordered={false}
              defaultValue={dayjs(deadLineDate)}
              onChange={e => onDayChange(e)}
            />
          </Space>
        </Form.Item>

        <Form.Item label="태그">
          <SelectTags setTag={setTag} />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Space size={"middle"}>
            <Button type="default" onClick={onClickCloseHandler}>
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

  /* width: 600px; */
  height: 400px;

  margin-top: 50px;

  background-color: #fff;
  border-radius: 20px;
`;
