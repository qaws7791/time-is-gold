import supabase from "supabase";
import { ITag, ITodo } from "supabase/database.types";

export const getTodos = async () => {
  let { data: Todos, error } = await supabase.from("Todos").select("*");
  if (error) {
    return console.log(error);
  }
  return Todos;
};

export const postTodos = async (newTodo: ITodo) => {
  await supabase.from("Todos").insert(newTodo);
};

// {
//   email: "olxl@gmail.com",
//   title: "test",
//   content: "test",
//   isDone: false,
//   tag: { edu: false, work: true },
//   deadLineDate: "2020-02-04"
// }

export const editTags = async (itemId: number, itemTags: ITag) => {
  await supabase.from("Todos").update({ tags: itemTags }).eq("id", itemId);
};
