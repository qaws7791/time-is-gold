import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkTodoImportance, deleteTodo, postTodo, switchTodo, updateTodo } from "supabase/todo";

// TODO
export const useTodo = () => {
  const queryClient = useQueryClient();
  const queryKey = ["todos"];

  const todoPostMutation = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    }
  });

  const todoIsDoneMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    }
  });

  const todoImportantMutation = useMutation(checkTodoImportance, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    }
  });

  const todoUpdateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    }
  });

  const todoDeleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    }
  });

  return {
    todoPostMutation,
    todoIsDoneMutation,
    todoImportantMutation,
    todoUpdateMutation,
    todoDeleteMutation
  };
};
