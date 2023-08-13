import { DatePicker, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useTodo } from "hooks";
import { useState } from "react";
import { styled } from "styled-components";
import { ITodo, ITodoforUpdate } from "supabase/database.types";
import SelectTags from "./SelectTags";
import { whatIsToday } from "./today";

interface Props {
  item: ITodo;
  onConfirm: () => void;
  onClose: () => void;
}

const TodoUpdateForm: React.FC<Props> = ({ item, onConfirm, onClose }) => {
  const [title, setTitle] = useState<string>(item.title);
  const [content, setContent] = useState<string>(item.content);
  const [deadline, setDeadline] = useState<string | undefined>(item.deadLineDate);
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
    console.log("✅", checkDate);
    setDeadline(checkDate);
  };

  const { todoUpdateMutation, todoDeleteMutation } = useTodo();

  // TODO email : auth연결하면 수정해줘야함. + tag 기능 추가하면 수정해줘야함. (현재 임의로 지정)
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTodo: ITodoforUpdate = {
      email: "jieun2563@naver.com",
      title,
      content,
      isDone: item.isDone,
      tag: ["edu", "work", "private", "chore"],
      deadLineDate: deadline,
      important: item.important
    };
    todoUpdateMutation.mutate({ id: item.id, updatedTodo });
    setTitle("");
    setContent("");
    setDeadline(whatIsToday());
    onConfirm();
  };
  const onClickDeleteHandler = () => {
    if (!window.confirm("삭제할거임?")) {
      return false;
    }
    todoDeleteMutation.mutate(item.id);
    onClose();
  };
  const onClickCloseModalHandler = () => {
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
        <button type="button" onClick={onClickDeleteHandler}>
          삭제
        </button>
        <button type="button" onClick={onClickCloseModalHandler}>
          닫기
        </button>
      </form>
    </StFormBackground>
  );
};

export default TodoUpdateForm;

const StFormBackground = styled.div`
  margin-top: 50px;
  width: 600px;
  height: 600px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
