"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

export interface TodoType {
  id: string;
  title: string;
  completed: boolean;
}

const getTodos = (): TodoType[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const saveTodos = (todos: TodoType[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: todos = [] } = useQuery<TodoType[]>({
    queryKey: ["todos"],
    queryFn: () => Promise.resolve(getTodos()), 
    enabled: typeof window !== "undefined",
  });

  const addMutation = useMutation<TodoType[], unknown, string>({
    mutationFn: async (title: string) => {
      const newTodo: TodoType = { id: uuidv4(), title, completed: false };
      const updated = [...todos, newTodo];
      saveTodos(updated);
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["todos"], data);
    },
  });

  const deleteMutation = useMutation<TodoType[], unknown, string>({
    mutationFn: async (id: string) => {
      const updated = todos.filter((todo) => todo.id !== id);
      saveTodos(updated);
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["todos"], data);
    },
  });

  const toggleMutation = useMutation<TodoType[], unknown, string>({
    mutationFn: async (id: string) => {
      const updated = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos(updated);
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["todos"], data);
    },
  });

  return {
    todos,
    addTodo: addMutation.mutate,
    deleteTodo: deleteMutation.mutate,
    toggleTodo: toggleMutation.mutate,
  };
};
