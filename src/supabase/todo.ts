import supabase from "supabase";
import { ITodoForInsert, ITodoForUpdate } from "supabase/database.types";

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
  inputValue: ITodoForUpdate;
}

export const getTodos = async (email: string) => {
  let { data: Todos } = await supabase.from("Todos").select("*").eq("email", email);
  return Todos;
};

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
  const { id, inputValue } = todo;
  const { error } = await supabase.from("Todos").update(inputValue).eq("id", id);
  console.log("error", error);
};

export const deleteTodo = async (id: number) => {
  const { error } = await supabase.from("Todos").delete().eq("id", id);
  console.log("error", error);
};
