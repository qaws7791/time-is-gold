import { Input, DatePicker, Space } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { whatIsToday } from "./today";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [deadline, setDeadline] = useState<string>(whatIsToday());
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("Change:", e.target.value);
  };
  return (
    <form>
      <Input
        name="title"
        showCount
        maxLength={30}
        value={title}
        onChange={onChange}
        placeholder="제목을 입력하세요"
      />
      <TextArea
        name="content"
        showCount
        maxLength={50}
        style={{ height: 50, resize: "none" }}
        value={content}
        onChange={onChange}
        placeholder="내용을 입력하세요"
      />
      <Space direction="vertical" size={12}>
        <DatePicker name="deadline" bordered={false} defaultValue={dayjs(deadline)} />
      </Space>

      <input type="text" name="tag" value={"여기는 일단 보류"} />
      <button type="submit"></button>
    </form>
  );
};
export default TodoForm;
