import { Input, DatePicker, Space } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { whatIsToday } from "./today";
import { postTodo } from "api/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITodoforInsert } from "supabase/database.types";
import { styled } from "styled-components";

const { TextArea } = Input;

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

const TodoForm: React.FC<Props> = ({ onConfirm, onClose }) => {
  const now = dayjs();
  console.log("💟", now.format());
  const queryClient = useQueryClient();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [deadline, setDeadline] = useState<string | undefined>(whatIsToday());
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "content") {
      setContent(e.target.value);
    }
  };
  console.log("dddddd", dayjs(deadline));
  const onDayChange = (e: dayjs.Dayjs | null) => {
    const checkDate = e?.format().split("T")[0];
    console.log("✅", checkDate);
    setDeadline(checkDate);
  };

  const todoPostMutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });

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
      tag: { edu: false },
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

        <input type="text" name="tag" defaultValue={"여기는 일단 보류"} />
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
