// // TODO Read
// // TODO Create
// // TODO Switch
// // TODO Update
// // TODO Delete
// TODO overlay modal 삭제 버튼에 적용 (삭제하시겠습니까? confirm용으로!)
// TODO  + tags
// TODO  + 중요

import supabase from "supabase";
import { ITodoforInsert, ITodoforUpdate } from "supabase/database.types";

export const getTodos = async () => {
  let { data: Todos } = await supabase.from("Todos").select("*");
  return Todos;
};

interface TodoSwitch {
  id: number;
  todoIsDone: boolean;
}

interface TodoUpdate {
  id: number;
  updatedTodo: ITodoforUpdate;
}

export const switchTodo = async (todo: TodoSwitch) => {
  const { id, todoIsDone } = todo;
  try {
    await supabase.from("Todos").update({ isDone: todoIsDone }).eq("id", id);
  } catch (error) {
    console.error(error);
  }
};

export const postTodo = async (newTodo: ITodoforInsert) => {
  // TODO 일단은 try catch 해주고,  필요없으면 없애기
  await supabase.from("Todos").insert(newTodo);
};

export const updateTodo = async (todo: TodoUpdate) => {
  const { id, updatedTodo } = todo;
  try {
    await supabase.from("Todos").update(updatedTodo).eq("id", id);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await supabase.from("Todos").delete().eq("id", id);
  } catch (error) {
    console.log(error);
  }
};
