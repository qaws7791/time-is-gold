import supabase from "supabase";
import { ITodoForInsert, ITodoForUpdate } from "supabase/database.types";

export const getTodos = async () => {
  let { data: Todos } = await supabase.from("Todos").select("*");
  return Todos;
};

interface TodoCheckImportance {
  id: number;
  important: boolean;
}

interface TodoSwitch {
  id: number;
  isDone: boolean;
}

interface TodoUpdate {
  id: number;
  updatedTodo: ITodoForUpdate;
}

export const switchTodo = async (todo: TodoSwitch) => {
  const { id, isDone } = todo;
  const { error } = await supabase.from("Todos").update({ isDone }).eq("id", id);
  console.log("error", error);
};

export const checkTodoImportance = async (todo: TodoCheckImportance) => {
  const { id, important } = todo;
  const { error } = await supabase.from("Todos").update({ important }).eq("id", id);
  console.log("error", error);
};

export const postTodo = async (newTodo: ITodoForInsert) => {
  const { error } = await supabase.from("Todos").insert(newTodo);
  console.log("error", error);
};

export const updateTodo = async (todo: TodoUpdate) => {
  const { id, updatedTodo } = todo;
  const { error } = await supabase.from("Todos").update(updatedTodo).eq("id", id);
  console.log("error", error);
};

export const deleteTodo = async (id: number) => {
  const { error } = await supabase.from("Todos").delete().eq("id", id);
  console.log("error", error);
};
