"use client";
import { useState } from "react";
import { useTodos } from "../hooks/useTodo";

const TodoForm = () => {
  const [input, setInput] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input.trim());
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mt-4 bg-white"
    >
      <input
        type="text"
        placeholder="Yangi narsa qo'shish"
        className="flex-1 p-3 text-gray-900 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-gray-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-950 transition font-medium"
      >
        Qoshish
      </button>
    </form>
  );
};

export default TodoForm;
