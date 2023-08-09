// // TODO Read
// TODO Create
// // TODO Switch
// TODO Update
// TODO Delete
// TODO  + tags
// TODO  + 중요

import { isDoneType } from "components/TodoCollection/TodoItem";
import supabase from "supabase";
import { ITag, ITodo } from "supabase/database.types";

export const getTodos = async () => {
  let { data: Todos } = await supabase.from("Todos").select("*");
  return Todos;
};

// 완료/취소해줄 from 'Todos' todo id, update 내용 {isDone : !원래값}

// SELECT ISDONE
// let { data: Todos, error } = await supabase
//   .from('Todos')
//   .select('isDone')
interface TodoSwitch {
  id: number;
  todoIsDone: boolean;
}

export const switchTodo = async (todo: TodoSwitch) => {
  const { id, todoIsDone } = todo;
  try {
    await supabase.from("Todos").update({ isDone: todoIsDone }).eq("id", id);
  } catch (error) {
    console.error(error);
  }
};

export const postTodo = async (newTodo: ITodo) => {
  await supabase.from("Todos").insert(newTodo);
};

// export const editTodos = async () => {
//   await
// }

// export cosnt deleteTodo = async(todoId) => {
//   await
// }

// // {
//   email: "olxl@gmail.com",
//   title: "test",
//   content: "test",
//   isDone: false,
//   tag: { edu: false, work: true },
//   deadLineDate: "2020-02-04"
// }
