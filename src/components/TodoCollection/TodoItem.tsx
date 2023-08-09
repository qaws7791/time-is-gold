// TODO tag는 후순위로 미루기 (할 때 datatype등 다시 설정해줘야함)
import { ITodo } from "supabase/database.types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { switchTodo } from "api/todo";

type Props = {
  item: ITodo;
};

export type isDoneType = { isDone: boolean };

const TodoItem = ({ item }: Props) => {
  const queryClient = useQueryClient();

  const todoIsDoneMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });
  const onClickSwitchHandler = () => {
    const todoIsDone: boolean = !item.isDone;
    todoIsDoneMutation.mutate({ id: item.id, todoIsDone });
  };
  return (
    <div>
      <p>{item.id}</p>
      <h1>이게 아이템이 들어갈 공간인데예</h1>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
      <p>~{item.deadLineDate}</p>
      <button onClick={onClickSwitchHandler}>{item.isDone ? "미완료" : "완료"}</button>
    </div>
  );
};

export default TodoItem;
