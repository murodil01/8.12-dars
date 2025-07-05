"use client";
import { useTodos } from "../hooks/useTodo";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useTodos();

  return (
    <div className="mt-6 space-y-3">
      {todos.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Hali hech narsa qoshilmagan</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;
