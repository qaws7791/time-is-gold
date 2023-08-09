import { ITodo } from "supabase/database.types";
import { useState } from "react";

type Props = {
  item: ITodo;
};

interface ITags {
  [key: string]: boolean;
}
const TodoItem = ({ item }: Props) => {
  const [tags, setTags] = useState<ITags>(item.tag);
  console.log(tags);
  return (
    <div>
      <h1>이게 아이템이 들어갈 공간인데예</h1>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <p>{item.deadLineDate}</p>
      <p>{item.isDone ? "완료" : "미완료"}</p>
      <p></p>
      <button></button>
    </div>
  );
};

export default TodoItem;
