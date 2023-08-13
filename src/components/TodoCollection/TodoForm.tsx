import { DatePicker, Input, Space } from "antd";
import dayjs from "dayjs";
import { useTodo } from "hooks";
import { useState } from "react";
import { styled } from "styled-components";
import { ITodoforInsert } from "supabase/database.types";
import SelectTags from "./SelectTags";
import { whatIsToday } from "./today";

const { TextArea } = Input;

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const TodoForm: React.FC<Props> = ({ onConfirm, onClose }) => {
  const now = dayjs();
  console.log("💟", now.format());
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [deadline, setDeadline] = useState<string | undefined>(whatIsToday());
  const [tag, setTag] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };

  const onDayChange = (e: dayjs.Dayjs | null) => {
    const checkDate = e?.format().split("T")[0];
    setDeadline(checkDate);
  };
  const { todoPostMutation } = useTodo();

  // TODO email : auth연결하면 수정해줘야함. + tag 기능 추가하면 수정해줘야함. (현재 임의로 지정)
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !deadline) {
      alert("제목, 내용, 마감기한 설정은 필수입니다");
      return false;
    }
    const newTodo: ITodoforInsert = {
      email: "jieun2563@naver.com",
      title,
      content,
      isDone: false,
      tag,
      deadLineDate: deadline,
      important: false
    };
    todoPostMutation.mutate(newTodo);
    setTitle("");
    setContent("");
    setDeadline(whatIsToday());
    onConfirm();
  };

  const onClickCloseHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClose();
  };

  return (
    <StFormBackground>
      <form onSubmit={e => onSubmitHandler(e)}>
        <Input
          name="title"
          showCount
          maxLength={20}
          value={title}
          onChange={onChange}
          placeholder="제목을 입력하세요"
        />
        <TextArea
          name="content"
          showCount
          maxLength={35}
          style={{ height: 50, resize: "none" }}
          value={content}
          onChange={onChange}
          placeholder="내용을 입력하세요"
        />
        <Space direction="vertical" size={12}>
          <DatePicker
            name="deadline"
            bordered={false}
            defaultValue={dayjs(deadline)}
            onChange={e => onDayChange(e)}
          />
        </Space>

        <SelectTags setTag={setTag} />
        <button type="submit">저장</button>
        <button type="button" onClick={onClickCloseHandler}>
          닫기
        </button>
      </form>
    </StFormBackground>
  );
};
export default TodoForm;

const StFormBackground = styled.div`
  margin-top: 50px;
  width: 600px;
  height: 600px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
