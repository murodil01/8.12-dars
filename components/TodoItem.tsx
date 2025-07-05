"use client";
import { useTodos, TodoType } from "../hooks/useTodo";
import { Trash2 } from "lucide-react";

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const { deleteTodo, toggleTodo } = useTodos();

  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`flex-1 cursor-pointer text-lg select-none ${
          todo.completed
            ? "line-through text-gray-400"
            : "text-gray-500 hover:text-gray-950"
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 transition ml-3"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TodoItem;
