import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "store";
import {
  checkTodoImportance,
  deleteTodo,
  getTodos,
  postTodo,
  switchTodo,
  updateTodo
} from "supabase/todo";

export const useTodo = () => {
  const queryClient = useQueryClient();
  const queryKey = ["todos"];

  const { currentUserEmail: email } = useCurrentUser();
  const response = useQuery(["todos"], () => getTodos(email));

  const todoPostMutation = useMutation(postTodo, {
    onSuccess: () => queryClient.invalidateQueries(queryKey)
  });

  const todoIsDoneMutation = useMutation(switchTodo, {
    onSuccess: () => queryClient.invalidateQueries(queryKey)
  });

  const todoImportantMutation = useMutation(checkTodoImportance, {
    onSuccess: () => queryClient.invalidateQueries(queryKey)
  });

  const todoUpdateMutation = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries(queryKey)
  });

  const todoDeleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries(queryKey)
  });

  return {
    response,
    todoPostMutation,
    todoIsDoneMutation,
    todoImportantMutation,
    todoUpdateMutation,
    todoDeleteMutation
  };
};
